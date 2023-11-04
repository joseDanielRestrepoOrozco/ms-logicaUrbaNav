import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'vehicles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('brand', 30).notNullable()
      table.string('model', 30).notNullable()
      table.date('year').notNullable()
      table.string('color', 20).notNullable()
      table.string('plate', 20).notNullable()
      table.integer('passenger_capacity').notNullable()
      table.string('property_card', 40).notNullable()
      table.string('soat', 40).notNullable()
     

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
