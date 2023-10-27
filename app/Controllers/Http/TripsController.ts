import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Trip from 'App/Models/Trip'

export default class TripsController {
    //Create
    public async store({ request }: HttpContextContract) {
        let body = request.body()
        const theTrip = await Trip.create(body)
        return theTrip
    }

    //Get
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        let trips: Trip[] = await Trip.query().paginate(page, perPage)
        return trips
    }

    public async show({ params }: HttpContextContract) {
        return Trip.findOrFail(params.id)
    }
}
