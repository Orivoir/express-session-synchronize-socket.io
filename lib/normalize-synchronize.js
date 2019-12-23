module.exports = function( serverType ) {

    if( /(udp|tcp(\/ip)?)|socket(\.io)?/i.test( serverType ) )
        return "tcp";

    if( /http(s|2)?|exp(ress)?|app/.test( serverType ) )
        return "http";

    return serverType ;
}