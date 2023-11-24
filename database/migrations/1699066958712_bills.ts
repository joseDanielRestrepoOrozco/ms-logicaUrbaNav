import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bills'

  /**
   * Metodo encargado de crear la tabla en MySQL
   */
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      
      table.increments('id').notNullable()
      table.integer('price').notNullable()
      table.date('date').notNullable()
      
      table.integer('trip_id').unsigned().references('trips.id')
      
      table.timestamp('created_at').defaultTo(this.raw('CURRENT_TIMESTAMP'))
      table.timestamp('updated_at').defaultTo(this.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))  
    })
  }

  /**
   *  Metodo para deshacer los cambios realizados en la base de datos 
   * en una migración específica.
   */
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
