import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Route from './Route'
import Driver from './Driver'

export default class Point extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public latitude: number

  @column()
  public longitude: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Driver, {
    foreignKey: 'point_id',
  })
  public drivers: HasMany<typeof Driver>

  @manyToMany(() => Route, {
    pivotTable: 'points_routes',
    pivotForeignKey: 'point_id',
    pivotRelatedForeignKey: 'route_id',
    pivotColumns: ['index']
  })
  public routes: ManyToMany<typeof Route>
}
