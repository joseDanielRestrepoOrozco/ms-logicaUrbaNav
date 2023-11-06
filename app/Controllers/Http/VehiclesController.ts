import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle';

export default class VehiclesController {

    
     /**
     * Almacena la informacion de un vehiculo
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Vehicle} - el vehiculo con su id
     */
     public async store({request}: HttpContextContract){
        let body=request.body();
        const theScreening=await Vehicle.create(body);
        return theScreening;

    }

    
    /**
     * Lista todas los vehiculos con paginadores
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Vehicle[]} - listado de los vehiculos con paginadores  
     */
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        let theVehicles:Vehicle[]= await Vehicle.query().paginate(page, perPage)
        return theVehicles;
    }

    /**
    * Muestra un vehiculo dado el id por la url
    * @param {HttpContextContract} params - peticion del usuario
    * @returns {Vehicle} - un vehiculo
    */
    public async show({ params }: HttpContextContract) {
        return Vehicle.findOrFail(params.id);
    }

    /**
     * Actualiza los datos del vehiculo
     * @param {HttpContextContract} request - solicitud con el body con informacion de los cambios
     * @param {HttpContextContract} params - parametros dados por URL
     * @returns hace efectivo el cambio en la base de datos
     */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theVehicle: Vehicle = await Vehicle.findOrFail(params.id);
        theVehicle.brand = body.brand;
        theVehicle.model = body.model;
        theVehicle.year = body.year;
        theVehicle.color = body.color;
        theVehicle.plate = body.plate;
        theVehicle.passengerCapacity = body.passengerCapacity;
        theVehicle.propertyCard = body.propertyCard;
        theVehicle.soat = body.soat;
        return theVehicle.save();
    }

    /**
     * busca y elimina un viaje dando el id como parametro
     * @param {HttpContextContract} response - respuesta por parte del servidor
     * @param {HttpContextContract} params - parametros dados por URL
     * @returns hace efectiva la eliminacion en la base de datos
     */
    public async destroy({ params, response }: HttpContextContract) {
        const theVehicle: Vehicle = await Vehicle.findOrFail(params.id);
        response.status(204);
        return theVehicle.delete();
    }
}
