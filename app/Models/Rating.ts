import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Trip from './Trip'

export default class Rating extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public stars: number

  @column()
  public comment: string

  @column()
  public date: DateTime

  @column()
  public trip_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Trip)
  public trip: BelongsTo<typeof Trip>
}
