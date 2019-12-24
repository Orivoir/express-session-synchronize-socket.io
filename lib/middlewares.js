module.exports = function( session ) {

    return {

        express: function( defaultValueSessionHttp = {} ) {

            session.http = typeof defaultValueSessionHttp === 'object' ? defaultValueSessionHttp: {};

            /**
             * @function middleware for express {📦}
             */
            return function( req , res , next ) {

                const {config} = session;

                let {pathGetSession,autoSynchro} = config ;

                if( !!autoSynchro ) {
                    // auto synchronize between request
                    session.synchronize( {
                        model: 'http'
                        ,target: 'tcp'
                    } ) ;
                }

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
        }

        ,socketIO: function( defaultValueSessionTcp = {} ) {

            session.tcp = typeof defaultValueSessionTcp === 'object' ? defaultValueSessionTcp: {};

            /**
             * @function middleware for socket.io {📦}
             */
            return function( socket , next ) {

                socket.session = session.done( 'tcp' ) ;
                next() ;
            }
        }

    }
} ;
