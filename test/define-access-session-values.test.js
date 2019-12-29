const
    {assert,expect} = require('chai')
    ,defineAccessSessionValuesTest = require('./../lib/define-access-session-values')
;

describe('test `define-access-session-values` module' , () => {

    it('should be an function' , () => {

        assert.isFunction( defineAccessSessionValuesTest ) ;

    } ) ;

    it('should be \\throw TypeError' , () => {

        const fxThrow = () => defineAccessSessionValuesTest( false , false ) ;

        expect( fxThrow ).to.throw( TypeError ) ;

    } ) ;

    it('should be return string' , () => {

        assert.isString( defineAccessSessionValuesTest( 'val' , 'http' ) )

    } ) ;

    it('should be return  arg1' , () => {

        const arg1 = 'data' ;

        expect( defineAccessSessionValuesTest( arg1 , 'http' ) ).to.equal( arg1 ) ;

    } ) ;

} ) ;