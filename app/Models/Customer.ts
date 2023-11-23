import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Driver from './Driver'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public contactEmergency: number

  @column()
  public user_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Driver, {
    pivotTable: 'trips',
    pivotForeignKey: 'customer_id',
    pivotRelatedForeignKey: 'driver_id',
    pivotColumns: ['date', 'price', 'status', 'route']
  })
  public drivers: ManyToMany<typeof Driver>
}
