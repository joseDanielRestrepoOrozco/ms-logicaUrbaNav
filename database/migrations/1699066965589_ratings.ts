import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ratings'


  /**
   * Metodo encargado de crear la tabla en MySQL
   */
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('stars')
      table.string('comment')
      table.dateTime('date_Time')
      table.integer('trip_id').unsigned().references('trips.id').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })  
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
