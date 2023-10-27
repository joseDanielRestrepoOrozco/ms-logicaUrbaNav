import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Point from 'App/Models/Point'

export default class PointsController {
    
    //Create
    public async store({ request }: HttpContextContract) {
        let body = request.body()
        const thePoint = await Point.create(body)
        return thePoint
    }

    //Get (list all)
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        let points: Point[] = await Point.query().paginate(page, perPage)
        return points
    }

    //Get (list one)
    public async show({ params }: HttpContextContract) {
        return Point.findOrFail(params.id)
    }

    //Update 
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const thePoint: Point = await Point.findOrFail(params.id)
        thePoint.name = body.name
        thePoint.latitude = body.latitude
        thePoint.longitude = body.longitude
        thePoint.route_id = body.route_id
        return thePoint.save()

    }

    //Delete
    public async destroy({ params, response }: HttpContextContract) {
        const thePoint: Point = await Point.findOrFail(params.id)
        response.status(204)
        return thePoint.delete()
    }

}
