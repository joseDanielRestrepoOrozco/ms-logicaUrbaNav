import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Route from './Route'
import Rating from './Rating'
import Bill from './Bill'

export default class Trip extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date: DateTime

  @column()
  public price: number

  @column()
  public status: boolean

  @column()
  public route_id: number

  @column()
  public customer_id: number

  @column()
  public driver_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Route)
  public route: BelongsTo<typeof Route>

  @hasOne(() => Bill, {
    foreignKey: 'trip_id',
  })
  public bill: HasOne<typeof Bill>

  @hasMany(() => Rating, {
    foreignKey: 'trip_id',
  })
  public ratings: HasMany<typeof Rating>

}
