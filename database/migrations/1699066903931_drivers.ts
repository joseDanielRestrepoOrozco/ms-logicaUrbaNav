import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'drivers'

  /**
   * Metodo encargado de crear la tabla en MySQL
   */
  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')
      table.boolean('is_available')
      table.string('user_id')
      // llaves foráneas FK de la tabla drivers
      table.integer('vehicle_id').unsigned().references('vehicles.id')
      table.integer('point_id').unsigned().references('points.id')

      table.timestamp('created_at').defaultTo(this.raw('CURRENT_TIMESTAMP'))
      table.timestamp('updated_at').defaultTo(this.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))  
    })
  }


  /**
   *  Metodo para deshacer los cambios realizados en la base de datos 
   * en una migración específica.
   */
  public async down () {
    this.schema.dropTable(this.tableName)
  }
}