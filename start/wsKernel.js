'use strict'

// Este se crea automaticamente con el comando: $ adonis install @adonisjs/websocket

const Ws = use('Ws')

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| Global middleware are executed on each Websocket channel subscription.
|
*/
const globalMiddleware = [  
 // 'Adonis/Middleware/BodyParser'
  // 'Adonis/Middleware/Session'  <-<- No esta instalado https://github.com/adonisjs/adonis-api-app/issues/32
  // 'Adonis/Middleware/AuthInit'  //<- No esta instalado https://github.com/adonisjs/adonis-api-app/issues/32
]


/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key/value pairs. Later you can use the
| keys to run selected middleware on a given channel.
|
| // define
| {
|   auth: 'Adonis/Middleware/Auth'
| }
|
| // use
| Ws.channel('chat', 'ChatController').middleware(['auth'])
*/
const namedMiddleware = {
  auth: 'Adonis/Middleware/Auth'
}


Ws
  .registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
