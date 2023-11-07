import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Route from './Route'

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

  @manyToMany(() => Route, {
    pivotTable: 'points_routes',
    pivotForeignKey: 'point_id',
    pivotRelatedForeignKey: 'route_id',
    pivotColumns: ['index']
  })
  public routes: ManyToMany<typeof Route>
}
