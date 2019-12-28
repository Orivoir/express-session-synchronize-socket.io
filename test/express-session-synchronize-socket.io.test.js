const
    {assert} = require('chai')
    ,expressSessionSynchronizesocketIoTest = require('./../express-session-synchronize-socket.io')
;

describe('test entry point' , () => {

    it('should be an Function' , () => {

        assert.isFunction( expressSessionSynchronizesocketIoTest ) ;

    } ) ;

    it('should be \\throw TypeError' , () => {

        try {

            expressSessionSynchronizesocketIoTest( true ) ;

            throw 'have not throw with TypeError';

        } catch( TypeError ) {
            //  ok!
        }

    } ) ;

    it('should not \\throw with an pattern' , () => {

        expressSessionSynchronizesocketIoTest( /get\/session\// ) ;

    } ) ;

    it('should not \\throw with an string' , () => {

        expressSessionSynchronizesocketIoTest( "/get/sessionHTTP" ) ;

    } ) ;

} ) ;
