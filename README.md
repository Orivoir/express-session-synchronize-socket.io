# express-session-synchronize-socket.io `version 0.1.5`
> express middleware session can use with socket.io have synchronizer session method and micro-service get session HTTP

### `npm i express-session-synchronize-socket.io --save`
### `yarn add express-session-synchronize-socket.io`

### you can use:

#### server.js
```javascript
const
    exp = require('express')
    ,app = exp()
    ,server = require('http').Server( app )
    ,session = require('express-session-synchronize-socket.io')()
    , io = require('socket.io')( server )
;


app
    // ... you'r other middlewares
    .use( session.express )
    // ... you'r other middlewares
;

app.get('/' , (req,res) => {

    const val = req.session.val ; // memory store access

    if( !val.id ) {

        req.session.val.id = Math.random() ; // define one key id for current session

        // manual synchronize memory store with tcp store
        req.session.synchronize( {
            model: "http"
            ,target: "tcp"
        } ) ;
    }

    console.log('from HTTP: ' , val.id ) ;

    res.sendFile('./index.html') ;

} ) ;

io
    // ... you'r other middlewares
    .use( session.socketIO )
    // ... you'r other middlewares
;

io.on('connect' , socket => {

    const val = socket.session.val;

    console.log( 'from TCP: ' , val.id ) ; // output <- 0.xxx... , after request on "/" ,  because HTTP controller have synchronize memory strore

} ) ;

server.listen( 80 , () => console.log('server run ...') ) ;
```

#### index.html
```html
<html>

    <head>
        <meta charset="utf-8">
        <title>index</title>
    </head>

    <body>

        <main>
            <h1>Lorem Ipsum</h1>
        </main>

        <script src="/socket.io/socket.io.js"></script>
        <script>
            const socket = io('/') ;
        </script>
    </body>
</html>
```

### middlewares optional config `arguments`
```javascript

    // ... ,
    session = require('express-session-synchronize-socket.io')(
        /* [pathGetSession:string] default */ "/get/session"
        /* return HTTP session in micro-service give null or false , if you want an manual control  */

        /* [autoSynchro:bool] default */ true
        /* synchronize HTTP session with TCP session between HTTP request you can manual use synchonize session */
    )
    // ... ,

```
