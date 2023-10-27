import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'

export default class CustomersController {
    //Create
    public async store({ request }: HttpContextContract) {
        let body = request.body()
        const theCustomer = await Customer.create(body)
        return theCustomer
    }

    //Get
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        let customers: Customer[] = await Customer.query().paginate(page, perPage)
        return customers
    }

    public async show({ params }: HttpContextContract) {
        return Customer.findOrFail(params.id)
    }

    //Update 
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theCustomer: Customer = await Customer.findOrFail(params.id)
        theCustomer.contactEmergency = body.contactEmergency
        return theCustomer.save()
    }

    //Delete
    public async destroy({ params, response }: HttpContextContract) {
        const theCustomer: Customer = await Customer.findOrFail(params.id)
        response.status(204)
        return theCustomer.delete()
    }
}
