"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

/**
 * User Stuff
 */

Route.post("login", "UserController.login");
Route.post("register", "UserController.register");
Route.get("get/:id", "UserController.getUser").middleware(["auth"]);
Route.get("games", "UserController.getGames").middleware(["auth"]);
Route.get("score/:id", "UserController.getScore").middleware(["auth"]);

/**
 * Admin Stuff
 */

Route.post("createg", "AdminController.createGame").middleware(["auth"]);
Route.get("getg", "AdminController.getGame").middleware(["auth"]);
Route.post("deleteg/:id", "AdminController.deleteGame").middleware(["auth"]);

// Route.post('resetg', 'AdminController.resetGame').middleware(['auth'])

// Route.get('get/:id', 'UserController.getUser').middleware('auth')
