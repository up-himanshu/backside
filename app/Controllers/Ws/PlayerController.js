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
		user_id_one: `${message.user_id_one}`,
		user_id_two: `${message.user_id_two}`,
		name: `${message.name}`,
		spin: `${message.spin}`
	})
	if(message.spin == 6 && message.status) 
	{
		
	}	
		this.socket.emit('message', await Game.findBy('id',{id:message.id}))
	} catch (error) {
	this.socket.emit('error',error)
	}
	}		
	// No se usa	
	async onSaveScore(message){
		// idusuario, idpartida, score		
		try {
		let nspin = Game.findBy('id',message.id)
		} catch (error) {
			this.socket.emit('error',error)
		}
	}
	// id usuario uno, id partida
	async onStartgame(message){
		try {
			let game = await Game.findBy('id',message.id)
			if(game)
			{	
				//console.log(game)
				if(game.user_id_one != 0 && game.user_id_two != 0){
					this.socket.emit('error',{error: 'Partida Lleno'})
				}else
				{						
				if(game.user_id_one != 0)
				{
					console.log('Condicion uno')
					await Game
					.query()
					.where('id', message.id)
					.update({				
					user_id_two: `${message.idusuario}`
	})
					//game.user_id_two = message.idusuario
				}
				else
				{ 
					console.log('condicion dos')
					await Game
	.query()
	.where('id', message.id)
	.update({				
		user_id_one: `${message.idusuario}`
	})
					//game.user_id_one = message.idUsuario
				}
			}
			}
			else
			{
				this.socket.emit('error',{error: 'El juego no existe'})	
			}
		} catch (error) {
			this.socket.emit('error',error)
		}
	}

	async onGames()
	{
		try {
			let games = await Game.all()
			//console.log(games)
			this.socket.broadcastToAll('games',games)
		} catch (error) {
			this.socket.emit('error',error)
		}
	}

	async onGlobalscores()
	{
		try {			
			let topscores = await Score.query().orderBy('score','desc').pick(10)		
			this.socket.broadcastToAll('globalscores', topscores)
			//console.log(topscores)
		} catch (error) {
			this.socket.emit('error',error)
		}
	}

	async onScore(message){
		try {
			let userInfo = await User.findBy('id',message.id)
			let scoreUser = await userInfo.scores().fetch()
			this.socket.broadcastToAll('scores', scoreUser)
		} catch (error) {
			this.socket.emit('error',error)
		}
	}
}

module.exports = PlayerController
