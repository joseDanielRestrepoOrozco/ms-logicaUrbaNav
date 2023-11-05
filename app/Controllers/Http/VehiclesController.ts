import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle';

export default class VehiclesController {

    
    /**
    * Almacena la informacion de un vehiculo
    * @param {HttpContextContract} request - peticion del usuario
    * @returns {Bill} - el vehiculo con su id
    */
    public async store({request}: HttpContextContract){
        let body=request.body();
        const theVehicle=await Vehicle.create(body);
        return theVehicle;

    }

    /**
     * Lista todas los vehiculos con paginadores
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Bill[]} - listado de los vehiculos con paginadores  
     */ 
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        let theVehicles:Vehicle[]= await Vehicle.query().paginate(page, perPage)
        return theVehicles;
    }

    /**
     * Muestra un vehiculo dado el id por la url
     * @param {HttpContextContract} params - parametros dado por Url
     * @returns {Bill} - un vehiculo
     */
    public async show({ params }: HttpContextContract) {
        return Vehicle.findOrFail(params.id);
    }

    /**
     * Actualiza un vehiculo
     * @param {HttpContextContract} params - parametros dados por Url
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Bill} - lo que devuelve la solicitud de guardado de un vehiculo
     */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theVehicle: Vehicle = await Vehicle.findOrFail(params.id);
        theVehicle.brand = body.brand;
        theVehicle.model = body.model;
        theVehicle.year = body.year;
        theVehicle.color = body.color;
        theVehicle.plate = body.plate;
        theVehicle.passenger_capacity = body.passenger_capacity;
        theVehicle.property_card = body.property_card;
        theVehicle.soat = body.soat;
        return theVehicle.save();
    }

   /**
     * elimina un vehiculo
     * @param {HttpContextContract} params - parametros dados por Url
     * @param {HttpContextContract} response - respuesta para el usuario
     * @returns {Bill} - lo que devuelve la solicitud de eliminacion
     */
    public async destroy({ params, response }: HttpContextContract) {
        const theVehicle: Vehicle = await Vehicle.findOrFail(params.id);
        response.status(204);
        return theVehicle.delete();
    }
}
