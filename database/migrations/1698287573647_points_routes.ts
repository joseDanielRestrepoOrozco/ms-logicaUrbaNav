import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'points_routes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')
      table.integer('index').notNullable()
      // foreign keys
      table.integer('route_id').unsigned().references('routes.id')
      table.integer('point_id').unsigned().references('points.id')

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
