'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

// Migracion de usuarios con una columna booleana que muestra si es Administrador (por defecto es falsa)

class UserSchema extends Schema {
	up () {
		this.create('users', (table) => {
			table.increments()
			table.string('username', 80).notNullable().unique()
			table.string('email', 254).notNullable().unique()
			table.string('password', 60).notNullable()
			table.boolean('is_admin').defaultTo(false)
			table.timestamps()
		})
	}

	down () {
		this.drop('users')
	}
}

module.exports = UserSchema
