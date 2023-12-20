import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Route from 'App/Models/Route'

export default class RoutesController {
  /**
   * Maneja una solicitud HTTP POST que se utiliza para crear y almacenar una nueva ruta en la base de datos
   * @param {HttpContextContract} request - El objeto de solicitud HTTP
   * @returns {Promise<Route>} Devuelve el registro recién creado, como respuesta a la solicitud HTTP
   */
  public async store({ request }: HttpContextContract) {
    let body = request.body()
    const theRoute = await Route.create(body)
    return theRoute
  }

  public async getRoute({ request }: HttpContextContract) {
    let body = request.body()
    const project = Database.from('roots')
    return Response.json({project})
    
  }


  /**
   * Recupera una lista paginada de recursos de tipo Route
   * @param {HttpContextContract} request - El objeto de solicitud HTTP
   * @returns {Promise<Route[]>} Se devuelve un array de registros Routes
   */
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

  /**
   * Obtiene un recurso de tipo 'Route' de la base de datos por su identificador.
   * @param {HttpContextContract} params - El objeto de parámetros de ruta proporcionado por AdonisJS, que generalmente contiene el identificador del recurso a buscar.
   * @returns {Promise<Route>} Una promesa que resuelve con el recurso de tipo 'Route' encontrado.
   * @throws ModelNotFoundException si el recurso no se encuentra en la base de datos.
   */
  public async show({ params }: HttpContextContract) {
    let theRoute: Route = await Route.query().where('id', params.id).firstOrFail();
    const points = await theRoute.related('points').query();
    const pointsroute = points.map((point) => {
      return {
        "index": point.$extras.pivot_index,
        "point": point.toJSON()
      }
    })
    return { ...theRoute.toJSON(), "pointsroute": pointsroute };
  }


  /**
   * Actualiza un registro existente de tipo Route en la base de datos.
   * @param params - El objeto de parámetros de ruta que contiene el ID del registro a actualizar. 
   * @param request - El objeto de contexto de solicitud HTTP que contiene los datos de actualización en el cuerpo de la solicitud. 
   * @returns {Promise<Route>} El registro de tipo Route actualizado en la base de datos.
   * @throws ModelNotFoundException si el recurso no se encuentra en la base de datos.
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theRoute: Route = await Route.findOrFail(params.id)
    theRoute.name = body.name
    return theRoute.save()

  }

  /**
   * Elimina un registro de tipo Route de la base de datos.
   * @param params - El objeto de parámetros de ruta que contiene el ID del registro a eliminar.
   * @param response - El objeto de contexto de respuesta HTTP utilizado para establecer el estado de respuesta.
   * @returns {Promise<void>} Nada (respuesta con estado 204 No Content) si la eliminación es exitosa.
   * @throws ModelNotFoundException Si no se encuentra un registro con el ID proporcionado.
   */
  public async destroy({ params, response }: HttpContextContract) {
    const theRoute: Route = await Route.findOrFail(params.id)
    response.status(204)
    return theRoute.delete()
  }

}
