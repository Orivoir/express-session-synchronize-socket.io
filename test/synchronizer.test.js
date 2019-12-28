const
    {assert,expect} = require('chai')
    ,synchronizerTest = require('./../lib/synchronizer')
    ,sessionFactory = require('./../lib/session')
;

describe('test synchronizer module' , () => {

    it('should be an Function' , () => {

        assert.isFunction( synchronizerTest ) ;

    } ) ;

    it('should be \\throw TypeError' , () => {

        try {

            synchronizerTest( undefined ) ;
            throw 'have not TypeError'

        } catch(TypeError) {
            // ok!
        }

    } ) ;

    it('should be return an object' , () => {

        const usualObject = synchronizerTest( sessionFactory ) ;

        assert.isObject( usualObject ) ;

    } ) ;

    it('should be contains 2 methods' , () => {

        const object = synchronizerTest( sessionFactory ) ;

        expect( object ).to.have.property( 'secure' ) ;
        expect( object ).to.have.property( 'force' ) ;

        assert.isFunction( object.secure ) ;
        assert.isFunction( object.force ) ;

    } ) ;

} ) ;

describe('test methods synchronizer' , () => {

    const {secure,force} = synchronizerTest( sessionFactory ) ;

    it('sould be all \\throw TypeError' , () => {

        try {

            secure() ;
            throw 'have not TypeError with secure method';
        } catch( TypeError ) { /* ok ! */ }

        try {

            force() ;
            throw 'have not TypeError with force method';
        } catch( TypeError ) { /* ok ! */ }

    } ) ;

    it('should all return object' , () => {

        assert.isObject( secure( { model: 'http' , target:'socket.io' } ) ) ;
        assert.isObject( secure( { model: 'socket' , target:'express' } ) ) ;

        assert.isObject( force( { model: 'exp' , target:'UDP' } ) ) ;
        assert.isObject( force( { model: 'http2' , target:'socket' } ) ) ;

    } ) ;

} ) ;
