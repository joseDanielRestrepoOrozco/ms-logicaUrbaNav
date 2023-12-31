import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Point from 'App/Models/Point';

export default class PointsController {


  public async store1({ request }: HttpContextContract) {
    let body = request.body();
    const thePoint = await Point.create(body);
    return thePoint
  }

  /**
   * Almacena la informacion de uno o varios puntos
   * @param {HttpContextContract} request - peticion del usuario
   * @returns {Point} - Punto con su id
   */
  public async store({ request }: HttpContextContract) {
    let body = request.body();

    if (Array.isArray(body)) {
      body.forEach(async (point) => {
        const thePoint = await Point.create(point);
        return thePoint;
      });
    } else {
      const thePoint = await Point.create(body);
      return thePoint;
    }
  }

  /**
   * Lista todas los puntos con paginadores
   * @param {HttpContextContract} request - peticion del usuario
   * @returns {Point[]} - listado de los puntos con paginadores  
   */
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1);
    const perPage = request.input('per_page', 20);
    let points: Point[] = await Point.query().paginate(page, perPage);
    return points;
  }

  /**
  * Muestra un punto dado el id por la url
  * @param {HttpContextContract} params - peticion del usuario
  * @returns {Rating} - un punto
  */
  public async show({ params }: HttpContextContract) {
    return Point.query().where('id', params.id).preload('routes').firstOrFail();
  }


  /**
   * Actualiza un punto
   * @param {HttpContextContract} params - parametros dados por Url
   * @param {HttpContextContract} request - peticion del usuario
   * @returns {Point} - lo que devuelve la solicitud de guardado de un punto
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body();
    const thePoint: Point = await Point.findOrFail(params.id);
    thePoint.name = body.name;
    thePoint.latitude = body.latitude;
    thePoint.longitude = body.longitude;
    return thePoint.save()
  }


  /**
   * elimina un punto
   * @param {HttpContextContract} params - parametros dados por Url
   * @param {HttpContextContract} response - respuesta para el usuario
   * @returns {Point} - lo que devuelve la solicitud de eliminacion
   */
  public async destroy({ params, response }: HttpContextContract) {
    let thePoint: Point = await Point.findOrFail(params.id);
    response.status(204)
     
    thePoint.delete()
    return{response:204, message:"Se elimino correctamente"}
  }
  // response.status(204).json({ message: 'se eliminó.' })

}
