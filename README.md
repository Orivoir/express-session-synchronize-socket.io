# express-session-synchronize-socket.io `version 0.1.0`
> express middleware session can use with socket.io have synchronizer session method and micro-service get session HTTP

### npm i express-session-synchronize-socket.io --save
### yarn add express-session-synchronize-socket.io

### use:
```javascript
const
    exp = require('express')
    ,app = exp()
    ,server = require('http').Server( app )
    ,session = require('express-session-synchronize-socket.io')( /* [pathGetSession="/get/session"] */ )
    , io = require('socket.io')( server )
;


app
    .use( session.express )
    // ... you'r another middlewares
;

app.get('/' , (req,res) => {

    const {val} = req.session ;

    if( !val.id ) {

        req.session.val.id = Math.random() ;

        // manual synchronize memory store
        req.session.synchronize( {
            model: "http"
            ,target: "tcp"
        } ) ;
    }

    console.log('from HTTP: ' , val.id ) ;

    res.sendFile('./index.html') ;

} ) ;

io
    .use( session.socketIO )
    // ... you'r another middlewares
;

io.on('connect' , socket => {

    const {val} = socket.session;

    console.log( 'from TCP: ' , val.id ) ;

} ) ;

server.listen( 80 , () => console.log('server run ...') ) ;
```

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
