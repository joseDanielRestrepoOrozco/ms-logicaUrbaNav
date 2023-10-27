import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Trip from 'App/Models/Trip'

export default class TripsController {
    /**
     * Almacena la informacion de un viaje
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Trip} - el viaje con su id
     */
    public async store({ request }: HttpContextContract) {
        let body = request.body()
        const theTrip = await Trip.create(body)
        return theTrip
    }

    /**
     * Lista todas los viajes con paginadores
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Trip[]} - listado de los viajes con paginadores  
     */
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        let trips: Trip[] = await Trip.query().paginate(page, perPage)
        return trips
    }
    /**
    * Muestra un viaje dado el id por la url
    * @param {HttpContextContract} params - peticion del usuario
    * @returns {Trip} - un viaje
    */
    public async show({ params }: HttpContextContract) {
        return Trip.findOrFail(params.id)
    }
}
