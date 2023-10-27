import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'drivers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('is_available')
      /**
       * columnas para las foreing key de vehiculos y puntos
       */
      //table.integer('vehicle_id').unsigned().references('vehicles.id').onDelete('CASCADE')
      //table.integer('point_id').unsigned().references('points.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
