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
			this.socket.on('error',() => {
				this.socket.emit('errorlog',error)
			})
		}
	}

	// END Testing //

	/**
	 * 
	 * @param {*} message Para mandar informacion de la pantalla
	 */

	async onMessage (message) {		
		try {											
				let thisvar = await Game.findBy('id', message.id)				
				this.socket.broadcastToAll('message',thisvar)						
		} catch (error) {
			this.socket.on('error',() => {
				this.socket.emit('errorlog',error)
			})
		}
	 
	}
	async onData (message){
	try {		
	await Game
	.query()
	.where('id', message.id)
	.update({
		display_active: `${message.display_active}`,
		spin: `${message.spin}`
	})	 
	// console.log('Enter OnData')
		 this.socket.emit('message', await Game.findBy('id',{id:message.id}))		
		//this.socket.emit('message', {id:message.id})
	} catch (error) {
		this.socket.on('error',() => {
			this.socket.emit('errorlog',error)
		})
	}
	}				
	async onSavescore(message){
		// idusuario, idpartida, score		
		try {
		// let nspin = Game.findBy('id',message.id)
		let score = new Score()
		score.user_id = message.id
		score.score = message.puntuaje
		await score.save()
		console.log(score)
		} catch (error) {
			this.socket.on('error',() => {
				this.socket.emit('errorlog',error)
			})
		}
	}
	// id usuario uno, id partida
	async onStartgame(message){
		try {
			let game = await Game.findBy('id',message.id)
			if(game)
			{					
				if(game.user_id_one != 0 && game.user_id_two != 0){					
					this.socket.emit('errorlog', {
						error: 'Partida Llena'
					})
				}else
				{						
				if(game.user_id_one == 0)
				{		
					//console.log('Guarda jugador uno')		
					await Game
					.query()
					.where('id', message.id)
					.update({				
					user_id_one: `${message.idusuario}`
					})		
				}
				else
				{				
					await Game
					.query()
					.where('id', message.id)
					.update({				
					user_id_two: `${message.idusuario}`
					})
					//game.user_id_one = message.idUsuario
				}
			}
			this.socket.emit('message', await Game.findBy('id',{id:message.id}),serverCode())
			}
			else
			{
				this.socket.emit('errorlog', {
					error: 'Juego No Existe'
				})
			}
		} catch (error) {
			this.socket.on('error',() => {
				this.socket.emit('errorlog',error)
			})
		}
	}

	async onErrorlog(thiserror){
		this.socket.broadcastToAll('errorlog',thiserror)
	}

	async onGames()
	{
		try {
			let games = await Game.all()			
			this.socket.broadcastToAll('games',games)
		} catch (error) {
			this.socket.on('error',() => {
				this.socket.emit('errorlog',error)
			})
		}
	}
/*
	async onUpdategame()
	{
		try {
			await Game
					.query()
					.where('id', message.id)
					.update({				
					user_id_one: `${message.idusuario}`
					})
		} catch (error) {

		}
	}*/
	async onCreategame(message){
		try {
			let game = new Game()
			game.name = message.name
			await game.save();
			//his.socket.emit('games')
		} catch (error) {
			this.socket.on('error',() => {
				this.socket.emit('errorlog',error)
			})
		}
	}

	async onDeletegame(message){
		try {
			let game = await Game.findBy('id',message.id)
			await game.delete();
			console.log(message)
		} catch (error) {
			this.socket.on('error',() => {
				this.socket.emit('errorlog',error)
			})
		}
	}

	async onGlobalscores()
	{
		try {			
			let topscores = await Score
			.query()
			.limit(10)
			.innerJoin('users','users.id','scores.user_id')
			.orderBy('score','desc')
			.fetch()		
			/*
			.table('users')
  			.innerJoin('accounts', 'user.id', 'accounts.user_id')
			*/
			this.socket.broadcastToAll('globalscores', topscores)			
		} catch (error) {
			this.socket.on('error',() => {
				this.socket.emit('errorlog',error)
			})
		}
	}

	async onScore(message){
		try {
			let userInfo = await User.findBy('id',message.id)			
			let scoreUser = await userInfo.scores().fetch()			
			this.socket.broadcastToAll('score', scoreUser)
		} catch (error) {
			this.socket.on('error',() => {
				this.socket.emit('errorlog',error)
			})
		}
	}
}

module.exports = PlayerController
