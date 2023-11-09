import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'vehicles'

  /**
   * Metodo encargado de crear la tabla en MySQL
   */
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
      table.timestamp('created_at').defaultTo(this.raw('CURRENT_TIMESTAMP'))
      table.timestamp('updated_at').defaultTo(this.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))  
    })
  }

  /**
   * Metodo para deshacer los cambios realizados en la base de datos 
   * en una migración específica.
   */
  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
