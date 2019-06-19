'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

// Migracion para guardar la puntuacion, esta es una tabla de tipo muchos apuntando uno a la de usuarios

class ScoresSchema extends Schema {
  up () {
    this.create('scores', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('score').notNullable()
      table.integer('display').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('scores')
  }
}

module.exports = ScoresSchema
