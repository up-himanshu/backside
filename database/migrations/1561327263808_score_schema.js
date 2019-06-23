'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScoreSchema extends Schema {
  up () {
    this.create('scores', (table) => {
      table.increments()
      table.integer('game_id').unsigned().references('id').inTable('games')
      table.integer('score').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('scores')
  }
}

module.exports = ScoreSchema
