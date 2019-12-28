const
    {assert,expect} = require('chai')
    ,normalizeSynchronizeTest = require('./../lib/normalize-synchronize')
;

describe('test normalize synchrnoize' , () => {

    it('should be an Function' ,() => {

        assert.isFunction( normalizeSynchronizeTest ) ;

    } ) ;

    it('should \\throw TypeError' , () => {

        try {

            normalizeSynchronizeTest( undefined ) ;
            throw 'have not TypeError' ;

        } catch( TypeError ) {
            // ok!
        }

    } ) ;

    it('should be return an string' , () => {

        assert.isString(normalizeSynchronizeTest('test'))

    } ) ;

    it('should return equal to arg1' , () => {

        expect( normalizeSynchronizeTest('test') ).to.be.equal( 'test' ) ;

    } ) ;

    it('should be return string equal to `tcp`' , () => {

        expect( normalizeSynchronizeTest('socket.io') ).to.be.equal( 'tcp' ) ;
        expect( normalizeSynchronizeTest('UDP') ).to.be.equal( 'tcp' ) ;
        expect( normalizeSynchronizeTest('tcp/ip') ).to.be.equal( 'tcp' ) ;
        expect( normalizeSynchronizeTest('tcp/IP') ).to.be.equal( 'tcp' ) ;
        expect( normalizeSynchronizeTest('Socket') ).to.be.equal( 'tcp' ) ;

    } ) ;

    it('should be return string equal to `http`' , () => {

        expect( normalizeSynchronizeTest('https') ).to.be.equal( 'http' ) ;
        expect( normalizeSynchronizeTest('Http2') ).to.be.equal( 'http' ) ;
        expect( normalizeSynchronizeTest('HTTPs') ).to.be.equal( 'http' ) ;
        expect( normalizeSynchronizeTest('exp') ).to.be.equal( 'http' ) ;
        expect( normalizeSynchronizeTest('express') ).to.be.equal( 'http' ) ;
        expect( normalizeSynchronizeTest('app') ).to.be.equal( 'http' ) ;

    } ) ;

} ) ;
