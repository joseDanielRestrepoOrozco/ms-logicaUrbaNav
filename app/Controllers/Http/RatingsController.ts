import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rating from 'App/Models/Rating';

export default class RatingsController {

    /**
     * Almacena la informacion de un comentario
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Rating} - la calificacion con su id
     */
    public async store({ request }: HttpContextContract) {
        let body = request.body();

        const theRating = await Rating.create(JSON.parse(body));
        return theRating
    }


    public async storeList({ request }: HttpContextContract) {
        let body = JSON.parse(request.body());
        console.log(body)
        body.forEach(async rating => {
           const theRating = await Rating.create(rating);
        });
    }

    /**
     * Lista todas las calificaciones con paginadores
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Rating[]} - listado de las calificaciones con paginadores  
     */
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        let ratings: Rating[] = await Rating.query().paginate(page, perPage);
        return ratings;
    }


    /**
     * Muestra una calificacion dado el id por la url
     * @param {HttpContextContract} params - peticion del usuario
     * @returns {Rating} - una calificacion
     */
    public async show({ params }: HttpContextContract) {
        return Rating.findOrFail(params.id);
    }


    /**
     * Actualiza una factura
     * @param {HttpContextContract} params - parametros dados por Url
     * @param {HttpContextContract} request - peticion del usuario
     * @returns {Rating} - lo que devuelve la solicitud de guardado de factura
     */
    public async update({ params, request }: HttpContextContract) { // descomposicion del objeto
        let body = JSON.parse(request.body());
        const theRating: Rating = await Rating.findOrFail(params.id);
        theRating.stars = body.stars;
        theRating.comment = body.comment;
        theRating.date_Time = body.date_Time;
        // theRating.trip = body.trip;
        return theRating.save()
    }


    /**
     * elimina una calificacion
     * @param {HttpContextContract} params - parametros dados por Url
     * @param {HttpContextContract} response - respuesta para el usuario
     * @returns {Rating} - lo que devuelve la solicitud de eliminacion
     */
    public async destroy({ params, response }: HttpContextContract) {
        let theRating: Rating = await Rating.findOrFail(params.id);
        response.status(204)
        return theRating.delete()
    }

}
