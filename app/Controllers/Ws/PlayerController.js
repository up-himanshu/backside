/* eslint-disable no-unused-vars */
'use strict'

const User = use('App/Models/User')
const Score = use('App/Models/Score')
const Game = use('App/Models/Game') 
const Ws = use('Ws')
class PlayerController {
	constructor ({ socket, request,auth }) {
		this.socket = socket
		this.request = request
		this.auth = auth
	}
   
	// START Testing //
	async onResponse(message){
		/*
		const chat = Ws.getChannel('chat')
		const {broadcast, emitTo} = chat.topic('chat')
		socket.emit('id', socket.id)*/
		try {
			//await this.socket.broadcastToAll('response',`You send this from client Message: ${JSON.stringify(message)}, Request: ${this.request.input('value')}`)			
			 this.socket.broadcastToAll('response', await Game.findBy('users_id',message.id))
		 // await	this.socket.broadcastToAll('response',`You send this from client Request: ${message.id}`)			

		} catch (error) {
			this.onError(error)
		}
	}

	// END Testing //

	/**
	 * 
	 * @param {*} message Para mandar informacion de la pantalla
	 */

	async onMessage (message) {		
		try {			
				let thisvar = await Game.findBy('user_id', message.id)
				this.socket.broadcastToAll('message',JSON.stringify(thisvar))	
				// console.log(message)		
		} catch (error) {
			this.socket.emit('error',error)
		}
	 
	}
	async onData (message){
	try {
	await Game
	.query()
	.where('id', message.id)
	.update({
		display_active: `${message.display_active}`,
		screenone: `${message.screenone}`,
		screentwo: `${message.screentwo}`,
		status: `${message.status}`
	})
	console.log(message)
		this.socket.emit('message', await Game.findBy('users_id',{id:message.id}))
} catch (error) {
	this.socket.emit('error',error)
}
	}			
}

module.exports = PlayerController
