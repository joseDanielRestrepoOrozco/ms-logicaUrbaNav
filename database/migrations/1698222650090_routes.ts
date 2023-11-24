import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'routes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')
      table.string('name', 50).notNullable()
      // foreign keys
      table.integer('origin').unsigned().references('points.id')
      table.integer('destination').unsigned().references('points.id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
