import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public brand:string

  @column()
  public model:string

  @column()
  public year:Date

  @column()
  public color:string

  @column()
  public plate:string

  @column()
  public passenger_capacity:number

  @column()
  public property_card:string

  @column()
  public soat:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
