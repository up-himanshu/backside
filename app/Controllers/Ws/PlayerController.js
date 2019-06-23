/* eslint-disable no-unused-vars */
'use strict'

const User = use('App/Models/User')
const Score = use('App/Models/Score')
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
		 await	this.socket.broadcastToAll('response',`You send this from client Request: ${message.value}`)			
		} catch (error) {
			this.onError(error)
		}
	}

	// END Testing //

	async onMessage (message) {
		// this.socket.broadcastToAll('message', message)
		let comosea = [
			{
				'Usuario':'1',
				'pantallaActiva': 0,
				'puntos': 0
			},
			{
				'Pantalla1': false,
				'Pantalla2': false
			}
		];

		try {
			await this.socket.broadcastToAll('message',`Hola por parte del Servidor ${message.value}`)
		} catch (error) {
			await this.onError(error)
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
