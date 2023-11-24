import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Trip from 'App/Models/Trip'

export default class TripsController {
    /**
     * Almacena la informacion de un viaje
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Trip} - el viaje con su id
     */
    public async store({ request }: HttpContextContract) {
        let body = JSON.parse(request.body());
        console.log(body)
        const theTrip = await Trip.create(body);
        return theTrip
    }


    public async storeList({ request }: HttpContextContract) {
        let body = JSON.parse(request.body());
        console.log(body)
        body.forEach(async trips => {
         const theTrip = await Trip.create(trips);
        });
    
    }

    /**
     * Lista todas los viajes con paginadores
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Trip[]} - listado de los viajes con paginadores  
     */
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        let trips: Trip[] = await Trip.query().preload("bill").paginate(page, perPage)
        return trips
    }
    s
    /**
    * Muestra un viaje dado el id por la url
    * @param {HttpContextContract} params - peticion del usuario
    * @returns {Trip} - un viaje
    */
    public async show({ params }: HttpContextContract) {
        return Trip.query().where("id",params.id).preload("bill")
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
