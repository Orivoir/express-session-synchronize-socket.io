const
    session = {
        http: {}
        ,tcp: {}

        ,config: {}

        ,set( config ) {

            if( typeof config !== "object")
                return;

            Object.keys( config ).forEach( attr => (
                session.config[ attr ] = config[attr]
            ) ) ;

            return session;
        }

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

        ,normalizeSynchronize: require('./normalize-synchronize')

        ,setWorkerSynchronize( model, target ) {

            session.model = session.normalizeSynchronize( model ) ;
            session.target = session.normalizeSynchronize( target ) ;

            return !!session.model && !!session.target ;
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
    } ,

    synchronizer = require('./synchronizer')( session )
;

session.synchronize = synchronizer.secure ;

/**
 * @warn attributes not exists in model are lost in target
 * @description brut copy data session e.g: `a = b`
 */
session.synchronizeForce = synchronizer.force ;

module.exports = session ;
