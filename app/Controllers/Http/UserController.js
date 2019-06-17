'use strict'

const User = use('App/Models/User')
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
				let usuario = await User.findBy('email',correo)
				let accesoToken = await auth.attempt(correo,contrasena)
				// let accesoToken = await auth.withRefreshToken().generate(usuario)
				return response.status(201).json(accesoToken)
			}
		} catch (error) {			
			return response.status(400).json({message: 'noRegisterError'})
		}
	}

	async getScore (request,response,auth) {
		if(!auth.user.is_admin){
			return response.status(400).json({message: 'noPlayerError'})
		} 
		const header = request.headers['authorization']
		if (typeof header !== 'undefined') {
			const bearer = header.split('.')
			const token = bearer[1]
			request.token = token
			// eslint-disable-next-line no-undef
			next();
		} else {
			response.sendStatus(403)
		}
	}

	// Funciona y validado

	async register ({request, auth, response}) {
		const userExists = await User.findBy('email',request.input('correo'))
		if(userExists) {
			return response
			.status(400)
			.json({error: "userExists"})
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

		return response.status(200).json({'usuario':nuevousuario,'accesotoken': accessToken})
		}
	}

	async getUser({params,response,auth}) {		
		if(!auth.user.is_admin){
			return response.status(400).json({message: 'noPlayerError'})
		} 
		let user = await User.findBy('id',params.id)
		return response.json({'info': user})		
	}
}

module.exports = UserController
