import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'

export default class CustomersController {
    /**
     * Almacena la informacion de un usuario
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Customer} - la factura con su id
     */
    public async store({ request }: HttpContextContract) {
        let body = request.body()
            // Resolviendo Union de Mongo NO TOCAR   ENSERIO!!!! 
            //let user = body.user_id
            //const result = await axios.get(`${Env.get('MS-SECURITY')}/api/user/{user}`,
            //{
            //    headers: {
             //     Authorization: `Bearer ${token}`
            //    }
             // })
        const theCustomer = await Customer.create(body)
        return theCustomer
    }

    /**
     * Lista todas los usuarios con paginadores
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Customer[]} - listado de los usuarios con paginadores  
     */
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        let customers: Customer[] = await Customer.query().paginate(page, perPage)
        return customers
    }

    /**
    * Muestra un cliente dado el id por la url
    * @param {HttpContextContract} params - peticion del usuario
    * @returns {Customer} - un cliente
    */
    public async show({ params }: HttpContextContract) {
        return Customer.findOrFail(params.id)
    }

    /**
     * Actualiza un cliente
     * @param {HttpContextContract} params - parametros dados por Url
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Customer} - lo que devuelve la solicitud de guardado
     */
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theCustomer: Customer = await Customer.findOrFail(params.id)
        theCustomer.contactEmergency = body.contactEmergency
        return theCustomer.save()
    }

    /**
     * elimina un cliente
     * @param {HttpContextContract} params - parametros dados por Url
     * @param {HttpContextContract} response - respuesta para el usuario
     * @returns {Customer} - lo que devuelve la solicitud de eliminacion
     */
    public async destroy({ params, response }: HttpContextContract) {
        const theCustomer: Customer = await Customer.findOrFail(params.id)
        response.status(204)
        return theCustomer.delete()
        //// -------->      REVISAR
    }
}
