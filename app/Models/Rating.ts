import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Rating extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public stars:number

  @column()
  public comment:String

  @column()
  public date_Time: DateTime

  @column()
  public trip_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

/*
customers
points
routes
drivers
vehicles
trips
bills
ratings
*/
