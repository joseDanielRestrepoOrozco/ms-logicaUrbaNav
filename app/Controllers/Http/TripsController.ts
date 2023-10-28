import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Trip from 'App/Models/Trip'

export default class TripsController {
    /**
     * Creacion de un viaje
     * @param {HttpContextContract} request - solicitud
     * @returns el viaje creado
     */
    public async store({ request }: HttpContextContract) {
        let body = request.body()
        const theTrip = await Trip.create(body)
        return theTrip
    }

    /**
     * busqueda de todos los viaje en la base de datos
     * @param {HttpContextContract} request - solicitud
     * @returns los viajes con paginacion
     */
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        let trips: Trip[] = await Trip.query().paginate(page, perPage)
        return trips
    }

    /**
     * mostrar un viaje dando un id como parametro
     * @param {HttpContextContract} params - parametros dados por URL
     * @returns el viaje si lo encontro
     */
    public async show({ params }: HttpContextContract) {
        return Trip.findOrFail(params.id)
    }

    /**
     * Actualiza los datos del viaje
     * @param {HttpContextContract} request - solicitud con el body con informacion de los cambios
     * @param {HttpContextContract} params - parametros dados por URL
     * @returns hace efectivo el cambio en la base de datos
     */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theTrip: Trip = await Trip.findOrFail(params.id)
        theTrip.date = body.date
        theTrip.price = body.price
        theTrip.status = body.status
        return theTrip.save()
    }

    /**
     * busca y elimina un viaje dando el id como parametro
     * @param {HttpContextContract} response - respuesta por parte del servidor
     * @param {HttpContextContract} params - parametros dados por URL
     * @returns hace efectiva la eliminacion en la base de datos
     */
    public async destroy({ params, response }: HttpContextContract) {
        const theTrip: Trip = await Trip.findOrFail(params.id)
        response.status(204)
        return theTrip.delete()
    }
}
