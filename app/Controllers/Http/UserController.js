'use strict'

const User = use('App/Models/User')
const Game = use('App/Models/Game') 
const Score = use('App/Models/Score')
//const Database = use('Database')
class UserController {
	/**
 * Metodos HTTP
 */

	// eslint-disable-next-line consistent-return
	async login ({request,auth,response}) {
		const correo = request.input('correo')
		const contrasena = request.input('contrasena')
		try {
			if(await auth.attempt(correo, contrasena)) {
			 let infoUsuario = await User.findBy('email',correo)
			 // let token = await auth.attempt(correo,contrasena)
				 let token = await auth.withRefreshToken().attempt(correo,contrasena)				
				return response.status(201).json(
					{	
						id:infoUsuario.id,
						usuario:infoUsuario.username,						
						correo: infoUsuario.email,
						token,
						rol: infoUsuario.role,
					})
			}
		} catch (error) {			
			return response.status(400).json({				
				message: 'Usuario o Passwords incorrectos'
			})
		}
	}


	async getScore({params,response,auth}) {		
		if(auth.user.role === 'admin'){
			return response.status(400).json({
				message: 'Sin Autorizacion'
			})
		} 
			/*let userInfo = await User.findBy('id',params.id)
			let scoreUser = await userInfo.scores().fetch()*/
							//let token = await userInfo.tokens().fetch()
	}

	// Funciona y validado

	async register ({request, auth, response}) {
		const userExists = await User.findBy('email',request.input('correo'))
		if(userExists) {
			return response
			.status(400)
			.json({
				message:'Correo ya existe'
			})
		}
		else {
		const usuario = request.input('usuario')
		const correo = request.input('correo')
		const contrasena = request.input('contrasena')

		let nuevousuario =  new User()        
		nuevousuario.username = usuario
		nuevousuario.email = correo
		nuevousuario.password = contrasena

		nuevousuario = await nuevousuario.save()
		// nuevousuario.id = await Database.select('id').from('users').where('email',nuevousuario.email)
		// Checar si autologear cuando se registra		
		let thisuser = await User.findBy('email', correo)
		let accessToken = await auth.generate(thisuser)

		// return response.status(200).json({'usuario':nuevousuario,'accesotoken': accessToken})
		return response.status(200).json({
			body:{
			message: 'Registro exitoso'
		}})
		}
	}

	async getUser({params,response,auth}) {		
		if(auth.user.role === 'admin'){
			return response.status(400).json({
				message: 'Sin Autorizacion'
			})
		} 
		let user = await User.findBy('id',params.id)
		return response.json({'info': user})		
	}


	async getGames({auth,response}){
		if(auth.user.role === 'admin'){
			return response.status(400).json({
				message: 'Sin Autorizacion'
			})
		} 
		let games = await Game.all()
		return response.status(201).json({
			games
		})
	}
}

module.exports = UserController
