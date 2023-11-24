import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bill from 'App/Models/Bill';

export default class BillsController {

    /**
     * Almacena la informacion de una factura
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Bill} - la factura con su id
     */
    public async store({ request }: HttpContextContract) {
        let body = JSON.parse(request.body());
        const theBill = await Bill.create(body);
        return theBill
    }

    public async storeList({ request }: HttpContextContract) {
        let body = request.body();
        body.forEach(async bill => {
            const theBill = await Bill.create(bill);
            return theBill
        });
    }

    /**
     * Lista todas las facturas con paginadores
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Bill[]} - listado de las facturas con paginadores  
     */
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        let bills: Bill[] = await Bill.query().paginate(page, perPage);
        return bills;
    }


    /**
     * Muestra una factura dado el id por la url
     * @param {HttpContextContract} params - parametros dado por Url
     * @returns {Bill} - una factura
     */
    public async show({ params }: HttpContextContract) {
        return Bill.findOrFail(params.id);
    }


    /**
     * Actualiza una factura
     * @param {HttpContextContract} params - parametros dados por Url
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Bill} - lo que devuelve la solicitud de guardado de una factura
     */
    public async update({ params, request }: HttpContextContract) {
        let body = JSON.parse(request.body());
        const theBill: Bill = await Bill.findOrFail(params.id);
        theBill.price = body.price;
        theBill.date = body.date;
        theBill.trip_id = body.trip_id;
        return theBill.save()
    }

    /**
     * elimina una factura
     * @param {HttpContextContract} params - parametros dados por Url
     * @param {HttpContextContract} response - respuesta para el usuario
     * @returns {Bill} - lo que devuelve la solicitud de eliminacion
     */
    public async destroy({ params, response }: HttpContextContract) {
        let theBill: Bill = await Bill.findOrFail(params.id);
        response.status(204)
        return theBill.delete()
    }




}
