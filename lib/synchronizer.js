module.exports = function( session ) {

    return {

        secure( {model,target} ) {

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
        ,force( {model,target} ) {

            if( !session.setWorkerSynchronize( model , target ) ) {

                throw "synchronize session reject with argument error : <object<model:string,target:string>>";
            }

            // warn: attr in target not exists in model is/are erease.s
            session[ target ] = session[ model ] ;

            return session ;
        }
    }
} ;
