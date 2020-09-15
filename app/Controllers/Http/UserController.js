"use strict";

const User = use("App/Models/User");
const Game = use("App/Models/Game");
const Score = use("App/Models/Score");
//const Database = use('Database')
class UserController {
  /**
   * Metodos HTTP
   */

  // eslint-disable-next-line consistent-return
  async login({ request, auth, response }) {
    const correo = request.body.correo;
    const contrasena = request.body.contrasena;
    try {
      if (await auth.attempt(correo, contrasena)) {
        let infoUsuario = await User.findBy("email", correo);
        // let token = await auth.attempt(correo,contrasena)
        let token = await auth.withRefreshToken().attempt(correo, contrasena);
        return response.status(201).json({
          id: infoUsuario.id,
          usuario: infoUsuario.username,
          correo: infoUsuario.email,
          token,
          rol: infoUsuario.role,
        });
      }
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        message: "Incorrect username or password",
      });
    }
  }

  async getScore({ params, response, auth }) {
    if (auth.user.role === "admin") {
      return response.status(400).json({
        message: "Sin Autorizacion",
      });
    }
    //let userInfo = await User.findBy('id',params.id)

    //let scoreUser = await userInfo.scores().fetch()
    let topscores = await Score.query()
      .limit(10)
      .innerJoin("users", "users.id", "scores.user_id")
      .orderBy("score", "desc")
      .fetch();

    /*let scores = await topscores			
			.innerJoin('users','users.id','scores.user_id')
			.fetch()*/
    //let scores = await topscores.innerJoin('users','user.id','score.user_id')
    //.innerjoin('users','user.id','score.user_id')
    //let token = await userInfo.tokens().fetch()
    return response.status(201).send(topscores);
  }

  // Funciona y validado

  async register({ request, auth, response }) {
    try {
      console.log(request.body);
      const userExists = await User.findBy("email", request.body.correo);
      if (userExists) {
        throw new Error("User already exists");
      } else {
        let userData = {
          username: request.body.usuario,
          email: request.body.correo,
          password: request.body.contrasena,
          role: request.body.role || "user",
        };
        console.log(userData);
        try {
          await User.create(userData);
        } catch (error) {
          console.log(error);
        }
        //   const usuario = request.input("usuario");
        //   const correo = request.input("correo");
        //   const contrasena = request.input("contrasena");

        //   let nuevousuario = new User();
        //   nuevousuario.username = usuario;
        //   nuevousuario.email = correo;
        //   nuevousuario.password = contrasena;

        //   nuevousuario = await nuevousuario.save();
        // nuevousuario.id = await Database.select('id').from('users').where('email',nuevousuario.email)
        // Checar si autologear cuando se registra
        //   let thisuser = await User.findBy("email", correo);
        //   let accessToken = await auth.generate(thisuser);

        // return response.status(200).json({'usuario':nuevousuario,'accesotoken': accessToken})
        return response.status(200).json({
          body: {
            message: "Registro exitoso",
          },
        });
      }
    } catch (error) {
      console.log(error);
      return response.status(400).send({ error: error.message });
    }
  }

  async getUser({ params, response, auth }) {
    if (auth.user.role === "admin") {
      return response.status(400).json({
        message: "Sin Autorizacion",
      });
    }
    let user = await User.findBy("id", params.id);
    return response.json({ info: user });
  }

  async getGames({ auth, response }) {
    if (auth.user.role === "admin") {
      return response.status(400).json({
        message: "Sin Autorizacion",
      });
    }
    let games = await Game.all();
    return response.status(201).json({
      games,
    });
  }
}

module.exports = UserController;
