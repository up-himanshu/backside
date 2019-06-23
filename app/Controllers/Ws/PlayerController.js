/* eslint-disable no-unused-vars */
'use strict'

const User = use('App/Models/User')
const Ws = use('Ws')
class PlayerController {
	constructor ({ socket, request }) {
		this.socket = socket
		this.request = request
	}
   /*
	onReturnResponse({response,request}){
		const chat = Ws.getChannel('chat')
		const {broadcast, emitTo} = chat.topic('chat')
		socket.emit('id', socket.id)
	}*/

	async onMessage (message) {
		// this.socket.broadcastToAll('message', message)
		let comosea = [
			{
				'Usuario':"1",
				'pantallaActiva':'0',
				'puntos':0
			
			},
			{
				'Pantalla1':false,
				'Pantalla2':false
			}
		];
		this.socket.broadcastToAll("message",comosea);
		await this.socket.emit();
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
