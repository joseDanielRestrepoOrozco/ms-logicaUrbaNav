import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class DriversController {
        /**
        * Almacena la informacion de un conductor
        * @param {HttpContextContract} request - peticion del usuario
        * @returns {Driver} - el conductor con su id
        */
        public async store({ request }: HttpContextContract) {
            let body = request.body()

            let result = await axios.post(`${Env.get('MS-SECURITY')}/private/users`, body)
    
            let bodyDriver = {
                contactEmergency: body["contactEmergency"],
                user_id: result.data["_id"]
            }
            let theDriver
            let asignacionRol
            if (result.data) {
                theDriver = await Driver.create(bodyDriver)
                if(theDriver){
                    asignacionRol = await axios.put(`${Env.get('MS-SECURITY')}/private/users/${bodyDriver.user_id}/role/6546e9c40c4d084e46c328ee`)
                    console.log(asignacionRol)
                }
            }
            
            return {
                driver:theDriver,
                user: asignacionRol.data
            }
        }
    
        /**
        * Lista todas los conductores con paginadores
        * @param {HttpContextContract} request - peticion del conductor
        * @returns {Customer[]} - listado de los conductores con paginadores  
        */
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

        /**
        * Muestra un conductor dado el id por la url
        * @param {HttpContextContract} params - peticion del usuario
        * @returns {Driver} - un conductor
        */
        public async show({ params }: HttpContextContract) {
            let theDriver: Driver = await Driver.query().where("id", params.id).preload('customers').firstOrFail();
            const customers = await theDriver.related('customers').query()
            const trips = customers.map((customer) =>{
                return{
                    "date": customer.$extras.pivot_date,
                    "price": customer.$extras.pivot_price,
                    "status": customer.$extras.pivot_status,
                    "route": customer.$extras.pivot_route,
                    "customer": customer.toJSON()
            }
            })
            return {...theDriver.toJSON(),"trips":trips}
        }
    
        /**
        * Actualiza un conductor
        * @param {HttpContextContract} params - parametros dados por Url
        * @param {HttpContextContract} request - peticion del usuario
        * @returns {Driver} - lo que devuelve la solicitud de guardado
        */
        public async update({ params, request }: HttpContextContract) {
            const body = request.body()
            const theDriver: Driver = await Driver.findOrFail(params.id)
            theDriver.isAvailable = body.isAvailable
            return theDriver.save()
        }
    
        /**
        * elimina un conductor
        * @param {HttpContextContract} params - parametros dados por Url
        * @param {HttpContextContract} response - respuesta para el usuario
        * @returns {Driver} - lo que devuelve la solicitud de eliminacion
        */
        public async destroy({ params, response }: HttpContextContract) {
            const theDriver: Driver = await Driver.findOrFail(params.id)
            response.status(204)
            return theDriver.delete()
        }
}
