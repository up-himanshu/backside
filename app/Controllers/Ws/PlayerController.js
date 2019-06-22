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
		await this.socket.emit()
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
