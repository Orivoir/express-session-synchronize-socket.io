const
    {assert,expect} = require('chai')
    ,middlewareTest = require('./../lib/middlewares')
    ,sessionFactory = require('./../lib/session')
;

describe('test build middlewares module' , () => {

    it('should be an Function' , () => {

        assert.isFunction( middlewareTest ) ;

    } ) ;

    it('should be return an object' , () => {

        assert.isObject( middlewareTest( sessionFactory ) ) ;

    } ) ;

    it('should \\throw TypeError with undefined arg1' , () => {

        try {

            middlewareTest() ;

            throw 'have not TypeError' ;

        } catch( TypeError ) {

            // ok !
        }

    } ) ;

    it('should \\throw TypeError with empty object arg1' , () => {

        try {

            middlewareTest({}) ;

            throw 'have not TypeError' ;

        } catch( TypeError ) {

            // ok !
        }

    } ) ;

} ) ;

describe('test middleware build with call function' , () => {

    const middlewareBuild = middlewareTest( sessionFactory ) ;

    it('should be contains 2 property contains function middlewares' , () => {

        expect( middlewareBuild ).to.have.property( 'express' ) ;

        expect( middlewareBuild ).to.have.property( 'socketIO' ) ;

        assert.isFunction( middlewareBuild.express ) ;
        assert.isFunction( middlewareBuild.socketIO ) ;

    } ) ;

    it('should be return an Function final middleware' , () => {


        assert.isFunction( middlewareBuild.express() ) ;
        assert.isFunction( middlewareBuild.socketIO() ) ;

    } ) ;

    it('should not throw socket middleware' , () => {

        middlewareBuild.socketIO()( {
            valueDef: 42
        } , () => ( console.log('\n\n\tfree socket middleware\n') ) ) ;

    } ) ;

    /**
     * @todo create simulacre HTTPResponse for cover middleware HTTP
     */

} ) ;
