import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'trips'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('date', { useTz: true})
      table.integer('price').notNullable()
      table.boolean('status').notNullable()
      /**
       * columna de foreing key de rutas
       */      
      //table.integer('route_id').unsigned().references('routes.id')
      table.integer('customer_id').unsigned().references('customers.id')
      table.integer('driver_id').unsigned().references('drivers.id')
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
