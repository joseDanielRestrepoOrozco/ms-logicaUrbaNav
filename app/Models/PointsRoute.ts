import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PointsRoute extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public index: number

  @column()
  public route_id: number

  @column()
  public point_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
