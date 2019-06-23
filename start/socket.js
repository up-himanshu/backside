'use strict'

// Este se crea automaticamente con el comando: $ adonis install @adonisjs/websocket

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')

Ws.channel('chat', ({ socket }) => {
	// eslint-disable-next-line no-console
	console.log('user joined with %s socket id', socket.id)
	console.log('a new subscription for news topic')	
	socket.on('message', (data) => {
	})
}).middleware(['auth'])


// Esto es todo para poder utilizar el canal y no agregar por partes y usar muchos closures
// como se muestra arriba
Ws.channel('player', 'PlayerController').middleware(['auth'])

