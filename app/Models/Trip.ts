import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne, } from '@ioc:Adonis/Lucid/Orm'
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

  /**
   * columna de foreing key de ruta
   */
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


    @hasOne(() => Bill,{
      foreignKey: 'trip_id',
    })
    public bill: HasOne<typeof Bill>

    
}
