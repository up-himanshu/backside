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
			// await this.socket.broadcastToAll('message',`Hola por parte del Servidor ${message.id}`)
			
			let thisvar = await Game.findBy('user_id', message.id)			
			this.socket.broadcastToAll('message',JSON.stringify(thisvar))
			console.log(thisvar)			
		} catch (error) {
			await this.onError(error)
		}
	 
	}
	async onData (message){
try {
		
} catch (error) {
	
}
	}		

	 async onError({error}) {
		  await this.socket.broadcastToAll('error',error)
	 }				
	
	 async onClose() {

	 }
	/*
  onLogout() {
  
  }
  onclose() {
  
  }
  onerror() {
  
  }*/
  
}

module.exports = PlayerController
