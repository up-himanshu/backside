'use strict'

const Game = use('App/Models/Game') 
class AdminController {
   async createGame({request, auth, response}){
       if(auth.user.role === 'admin'){
        let nuevojuego = new Game()
         nuevojuego.name = request.input('name')
    await nuevojuego.save()
    return response.status(201).json({
        message: 'Creado'
    })
       }
    return response.status(400).json({
        message: 'Sin Autorizacion'
    })
    }

    async resetGame({ request, response, auth }){
        if(auth.user.role === 'admin'){
            const id = await Game.findBy('id',request.input('id'))
            if(id){
               await Game
               .query()
               .where('id',request.input('id'))
               .update({
                   display_active: 0,
                   user_id_one: 0,
                   user_id_two: 0,
                   spin: 0
               })
               return 
            }
            else {
               return response
               .status(400)
               .json({
                   message:'El juego no existe'
               })
            }     
           }
        return response.status(400).json({
            message: 'Sin Autorizacion'
        })
    }

    async getGame({request, auth, response}){
        if(auth.user.role === 'admin'){
            let games = await Game.all()
            return response.status(201).json(games)
           }
        return response.status(400).json({
            message: 'Sin Autorizacion'
        })
    }

    async updateGame({request, auth, response}){
        if(auth.user.role === 'admin'){
         const id = await Game.findBy('id',request.input('id'))
         if(id){
            await Game
            .query()
            .where('id',request.input('id'))
            .update({
                display_active: `${request.input('display_active')}`,
		        user_id_one: `${request.input('user_id_one')}`,
		        user_id_two: `${request.input('user_id_two')}`,		        
		        spin: `${request.input('spin')}`
            })
            return 
         }
         else {
            return response
			.status(400)
			.json({
				message:'El juego no existe'
			})
         }     
        }
     return response.status(400).json({
         message: 'Sin Autorizacion'
     })
     }


     async deleteGame({request, auth, response}){
        if(auth.user.role === 'admin'){
            const id = await Game.findBy('id',request.input('id'))
            if(id){
               await id.delete()               
               return response
               .status(400)
               .json({
                   message: 'Borrado'
               })
            }
            else {
               return response
               .status(400)
               .json({
                   message:'El juego no existe'
               })
            }     
        }
     return response.status(400).json({
         message: 'Sin Autorizacion'
     })
     }
}

module.exports = AdminController
