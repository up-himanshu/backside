'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
  up () {
    this.create('games', (table) => {
      table.increments()      
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('display_active').notNullable().defaultTo(0)
      table.boolean('screenone').notNullable().defaultTo('false')
      table.boolean('screentwo').notNullable().defaultTo('false')
      table.boolean('status').notNullable().defaultTo('false') // status game
      table.timestamps()
    })
  }

  down () {
    this.drop('games')
  }
}

module.exports = GameSchema
