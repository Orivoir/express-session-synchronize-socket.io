/**
 * @author S.Gaborieau <sam.gabor@hotmail.com>
 *
 * @package [npm] express-session-synchronize-socket.io
 * @version 0.1.5 `stable version`
 *
 * @git <https://github.com/Orivoir/express-session-synchronize-socket.io>
 * @npm <https://www.npmjs.com/package/express-session-synchronize-socket.io>
 */

const
    /**
     * @const {object} session
     * @description memory store **HTTP** and **TCP/IP** contains **synchronizer methods**
     */
    session = require('./lib/session')

    /**
     * @const {object} middlewares
     * @method `express`
     * @method `socketIO`
     * @description contains **middlewares** `methods` for **router** `express` *and* `socket.io` **module**
     */
    ,middlewares = require('./lib/middlewares')( session )
;

/**
 * @export {Function}
 * @param {string|RegExp} pathGetSession path access session HTTP value from `GET` route **HTTP session in micro-service**
 * @param {boolean} autoSynchro auto synchronize with `HTTP` model between `HTTP` request
 * @return {object} middlewares
 * @description **hydrate config** with @params and `return` **middlewares** methods
 */
module.exports = function(

    pathGetSession = "/get/session"

    ,autoSynchro = true
) {

    if(
        typeof pathGetSession !== 'string' &&
        ( typeof pathGetSession !== 'object' || !pathGetSession.source )
    ) {
        throw new TypeError('arg1 pathGetSession bust be an string') ;
    }
    if( typeof pathGetSession === 'object' ) {
        // not support regexp
        pathGetSession = pathGetSession.source ;
    }

    autoSynchro = !!autoSynchro ;

    session.set( {
        pathGetSession: pathGetSession
        ,autoSynchro: autoSynchro
    } ) ;

    return middlewares ;
} ;
