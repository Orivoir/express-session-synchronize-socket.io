const
    // memory store
    session = require('./lib/session')

    // callbacks dist
    ,middlewares = require('./lib/middlewares')( session )
;

module.exports = function(
    pathGetSession = "/get/session"
    ,autoSynchro = true
) {

    session.set( {
        pathGetSession: pathGetSession
        ,autoSynchro: autoSynchro
    } ) ;

    return middlewares ;
} ;
