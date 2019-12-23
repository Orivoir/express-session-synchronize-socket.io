const
    session = {
        http: {}
        ,tcp: {}

        ,_model: null
        ,get model() {
            return this._model;
        }
        ,set model(val) {
            this._model = ( typeof val === "string" ) ? val.toLocaleLowerCase().trim() : null;
        }

        ,_target: null
        ,get target() {
            return this._target ;
        }
        ,set target(val) {

            this._target = ( typeof val === "string" ) ? val.toLocaleLowerCase().trim() : null;
        }

        ,normalizeSynchronize( serverType ) {

            if( /(udp|tcp(\/ip)?)|socket(\.io)?/i.test( serverType ) )
                return "tcp";

            if( /http(s|2)?|exp(ress)?|app/.test( serverType ) )
                return "http";

            return serverType ;
        }

        ,setWorkerSynchronize( model, target ) {

            session.model = session.normalizeSynchronize( model ) ;
            session.target = session.normalizeSynchronize( target ) ;

            return !!session.model && !!session.target ;
        }

        ,synchronize( {model,target} ) {

            if( !session.setWorkerSynchronize( model , target ) ) {

                throw "synchronize session reject with argument error : <object<model:string,target:string>>";
            }

            model = session.model ;
            target = session.target ;

            Object.keys( session[model] ).forEach( attr => (
                session[ target ][ attr ] = session[model][attr]
            ) ) ;

            return session;
        }

        /**
         * @warn attr.s in target can be lost
         */
        ,synchronizeForce( {model,target} ) {

            if( !session.setWorkerSynchronize( model , target ) ) {

                throw "synchronize session reject with argument error : <object<model:string,target:string>>";
            }

            // warn: attr in target not exists in model is/are erease.s
            session[ target ] = session[ model ] ;

            return session ;
        }

        /**
         * @return {object} data session middleware
         */
        ,done( serverType ) {

            if( !this[ serverType ] ) {

                throw 'InternalError "serverType" not found middleware data not build session reject';
            }

            return {
                val: this[ serverType ]
                ,synchronize: this.synchronize
                ,synchronizeForce: this.synchronizeForce
            } ;
        }
    }
;

const middlewares = {

    express: function( req , res , next ) {

        let {pathGetSession} = session ;

        if( !!pathGetSession ) {

            // render HTTP session in micro-service for browser access

            if( typeof pathGetSession === "string" ) // string === exact path
                pathGetSession = new RegExp( "^"+pathGetSession+"$") ;

            if( !(pathGetSession instanceof RegExp) ) // back to default path
                pathGetSession = new RegExp("^"+"/get/session"+"$") ;

            if( pathGetSession.test(req.url) ) {
                // this url match with get session
                res.type('application/json') ;
                res.send( JSON.stringify( session.http ) ) ;

            } else {
                // access session in request and free middleware
                req.session = session.done( 'http' ) ;
                next() ;
            }

        } else {
            // client want an manual control send session , auto micro-service HTTP session is reject by client

            // access session in request and free middleware
            req.session = session.done( 'http' ) ;
            next() ;
        }
    }

    ,socketIO: function( socket , next ) {

        socket.session = session.done( 'tcp' )
        next() ;
    }

} ;

module.exports = function( pathGetSession = "/get/session" ) {

    session.pathGetSession = pathGetSession ;

    return middlewares ;
} ;