'use strict'

const Game = use('App/Models/Game') 
class AdminController {
   async createGame({request, auth, response}){
       if(auth.user.role === 'admin'){
        let nuevojuego = new Game()
    await nuevojuego.save()
    return 
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
}

module.exports = AdminController
