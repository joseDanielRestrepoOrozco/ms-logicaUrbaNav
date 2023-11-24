import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Point from './Point'
import Trip from './Trip'

export default class Route extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Trip, {
    foreignKey: 'route_id',
  })
  public trips: HasMany<typeof Trip>

  @manyToMany(() => Point, {
    pivotTable: 'points_routes',
    pivotForeignKey: 'route_id',
    pivotRelatedForeignKey: 'point_id',
    pivotColumns: ['index']
  })
  public points: ManyToMany<typeof Point>
}
