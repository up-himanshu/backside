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
				let accesoToken = await auth.generate(usuario)				
				response.status(201)
				return response.json(accesoToken)
			}
		} catch (error) {
			response.status(403)
			return response.json({message: 'You must Register first'})
		}
	}

	async getScore (request,response){
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

	async register ({request, auth, response}) {
		const usuario = request.input('usuario')
		const correo = request.input('correo')
		const contrasena = request.input('contrasena')

		let nuevousuario =  new User()        
		nuevousuario.username = usuario
		nuevousuario.email = correo
		nuevousuario.password = contrasena

		nuevousuario = await nuevousuario.save()
		// nuevousuario.id = await Database.select('id').from('users').where('email',nuevousuario.email)		
		let thisuser = await User.findBy('email', correo)
		let accessToken = await auth.generate(thisuser)

		return response.json({'usuario':nuevousuario,'accesotoken': accessToken})
	}
	async getUser({params}) {
		let user = await User.findBy('id',params.id)
		return user.json({'info': user})
	}
}

module.exports = UserController
