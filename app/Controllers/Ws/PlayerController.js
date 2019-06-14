/* eslint-disable no-unused-vars */
'use strict'

const User = use('App/Models/User')
class PlayerController {
	constructor ({ socket, request }) {
		this.socket = socket
		this.request = request
	}
   
	onLogin ({auth}) {
		// this.socket.
		auth.attempt(this.request.correo, this.request.contrasena)
				
	}
  
	onMessage (message) {
		this.socket.broadcastToAll('message', message)
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
