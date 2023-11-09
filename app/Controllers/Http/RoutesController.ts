import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from 'App/Models/Route'

export default class RoutesController {
    
    
    //Create
    public async store({ request }: HttpContextContract) {
        let body = request.body()
        const theRoute = await Route.create(body)
       return theRoute
    }
    
    //Get (list all)
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        let Routes: Route[] = await Route.query().paginate(page, perPage)
        return Routes
    }

    public async storeList({ request }: HttpContextContract) {
        let body = request.body();
        body.forEach(async route => {
            const theRoute = await Route.create(route);
        });
    
    }

    //Get (list one)
    public async show({ params }: HttpContextContract) {
        return Route.findOrFail(params.id)
    }

    //Update 
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theRoute: Route = await Route.findOrFail(params.id)
theRoute.name = body.name
        theRoute.name = body.name
        theRoute.origin = body.origin
        theRoute.destination = body.destination
        return theRoute.save()
    
    }

    //Delete
    public async destroy({ params, response }: HttpContextContract) {
        const theRoute: Route = await Route.findOrFail(params.id)
        response.status(204)
        return theRoute.delete()
    }

}
