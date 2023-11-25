import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PointsRoute from 'App/Models/PointsRoute'

export default class PointsRoutesController {

  public async store({ request }: HttpContextContract) {
    let body = request.body();
    // let body = JSON.parse(request.body());

    if (Array.isArray(body)) {
      body.forEach(async (pr) => {
        const thePR = await PointsRoute.create(pr);
        return thePR;
      });
    } else {
      const thePR = await PointsRoute.create(body);
      return thePR;
    }
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 20)
    let PR: PointsRoute[] = await PointsRoute.query().paginate(page, perPage)
    return PR
  }

  public async show({ params }: HttpContextContract) {
    return PointsRoute.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const thePR: PointsRoute = await PointsRoute.findOrFail(params.id)
    thePR.route_id = body.route_id
    thePR.point_id = body.point_id
    return thePR.save()
  }

  public async destroy({ params, response }: HttpContextContract) {
    const thePR: PointsRoute = await PointsRoute.findOrFail(params.id)
    response.status(204)
    return thePR.delete()
  }
}
