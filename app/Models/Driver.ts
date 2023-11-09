import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public isAvailable: boolean

  @column()
  public user_id: string

  /**
   * columnas de foreing key de vehiculo y puntos
   */
  @column()
  public vehicle_id: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Customer, {
    pivotTable: 'trips',
    pivotForeignKey: 'driver_id',
    pivotRelatedForeignKey: 'customer_id',
    pivotColumns: ['date','price','status','route']
  })
  public customers: ManyToMany<typeof Customer>
}
