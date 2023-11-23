import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'points'

  /**
   * Metodo encargado de crear la tabla en MySQL
   */
  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      
      table.increments('id')
      table.string('name', 50).notNullable()
      table.float("latitude").notNullable()
      table.float("logitude").notNullable()
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
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
