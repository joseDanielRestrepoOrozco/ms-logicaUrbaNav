import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Driver from './Driver'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ isPrimary: true })
  public contactEmergency: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Driver, {
    pivotTable: 'trips',
    pivotForeignKey: 'customer_id',
    pivotRelatedForeignKey: 'driver_id',
    pivotColumns: ['date']
  })
  public drivers: ManyToMany<typeof Driver>
}
