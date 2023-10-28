import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver'

export default class DriversController {
    //Create
    public async store({ request }: HttpContextContract) {
        let body = request.body()
        const theDriver = await Driver.create(body)
        return theDriver
    }

    //Get
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        let drivers: Driver[] = await Driver.query().paginate(page, perPage)
        return drivers
    }

    /**
     * esto puede ayudar cuando se haga la relacion entre conductor y vehiculo
     * @returns 
     */
    // public async show({ params }: HttpContextContract) {
    //     let theDriver: Driver = await Driver.query().where("id", params.id).preload('vehicle').firstOrFail()
    //     return theDriver
    // }

    public async show({ params }: HttpContextContract) {
        return Driver.findOrFail(params.id)
    }

    //Update 
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theDriver: Driver = await Driver.findOrFail(params.id)
        theDriver.isAvailable = body.isAvailable
        return theDriver.save()
    }

    //Delete
    public async destroy({ params, response }: HttpContextContract) {
        const theDriver: Driver = await Driver.findOrFail(params.id)
        response.status(204)
        return theDriver.delete()
    }
}
