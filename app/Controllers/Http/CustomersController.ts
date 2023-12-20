import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios'

export default class CustomersController {

  public async get_token(request) {
    let theRequest = request.toJSON()
    let token = ""
    if (theRequest.headers.authorization) {
      token = theRequest.headers.authorization.replace("Bearer ", "")
    }
    return token
  }

  /**
  * Almacena la informacion de un usuario
  * @param {HttpContextContract} request - peticion del usuario
  * @returns {Customer} - el cliente con su id
  */
  public async createOnlyCustomer({ request, params }: HttpContextContract) {
    let body = request.body()
    let token = await this.get_token(request)
    let user = (await axios.get(`${Env.get('MS_SECURITY')}/private/users/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })).data
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 20)
    let customers = await Customer.query().paginate(page, perPage)
    let seguir = true
    customers.serialize().data.forEach(customer => {
      if (customer.user_id === params.id) {
        seguir = false
      }
    });
    if (user != "" && seguir) {
      return await this.create(body, token)
    }
    return { response: 404, error: "No se pudo crear el cliente correctamente" };
  }

  /**
   * Hace peticiones para la creacion de User
   * @param body 
   * @returns {Customer} - el cliente con su usuario
   */
  public async create(body, token) {
    let result = await axios.post(`${Env.get('MS_SECURITY')}/private/users`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    let bodyCustomer = {
      user_id: result.data["_id"],
      contactEmergency: body["contactEmergency"]
    }
    let theCustomer
    let asignacionRol
    if (result.data != "") {
      theCustomer = await Customer.create(bodyCustomer)
      if (theCustomer) {
        asignacionRol = await axios.put(`${Env.get('MS_SECURITY')}/private/users/${bodyCustomer.user_id}/role/6539c4950ffeb14602a8d947`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(asignacionRol)
        return { ...theCustomer.toJSON(), user: asignacionRol.data };
      }
    }
    return { response: 404, error: "No se pudo crear el usuario correctamente" };
  }


  /**
   * Almacena la informacion de un usuario
   * @param {HttpContextContract} request - peticion del usuario
   * @returns {Customer} - el cliente con su id
   */
  public async store({ request }: HttpContextContract) {
    let body = request.body()
    let token = await this.get_token(request)
    return await this.create(body, token)
  }



  /**
   * name
   */
  public async storeList({ request }: HttpContextContract) {
    let body = request.body()
    let token = await this.get_token(request)
    body.forEach(async customer => {
      await this.create(customer, token)

    });
  }

  /**
   * Lista todas los usuarios con paginadores
   * @param {HttpContextContract} request - peticion del usuario
   * @returns {Customer[]} - listado de los usuarios con paginadores  
   */
  public async index({ request }: HttpContextContract) {
    let token = await this.get_token(request)
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 20)
    let customers = await Customer.query().paginate(page, perPage)
    type CustomerInfo = {
      user: any,
      Pqrs: any,
      PaymentMethod: any
    }
    let infoCompleta: CustomerInfo[] = []

    for (let customer of customers.serialize().data) {

      let user = (await axios.get(`${Env.get('MS_SECURITY')}/private/users/${customer.user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).data
      console.log("token", token)
      let PaymentMethod = (await axios.get(`${Env.get('MS_SECURITY')}/private/paymentmethod/user/${customer.user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).data
      let Pqrs = (await axios.get(`${Env.get('MS_SECURITY')}/private/pqrs/user/${customer.user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).data

      infoCompleta.push({ ...customer, user, PaymentMethod, Pqrs })
    }

    return { pagination: customers.serialize().meta, customers: infoCompleta }
  }


  /**
  * Muestra un cliente dado el id por la urls
  * @param {HttpContextContract} params - peticion del usuario
  * @returns {Customer} - un cliente
  */
  public async show({ params, request }: HttpContextContract) {
    let token = await this.get_token(request)
    let theCustomer: Customer = await Customer.findOrFail(params.id)
    let customer = theCustomer.serialize()
    let user = (await axios.get(`${Env.get('MS_SECURITY')}/private/users/${customer.user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })).data
    let PaymentMethod = (await axios.get(`${Env.get('MS_SECURITY')}/private/paymentmethod/user/${customer.user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })).data
    let Pqrs = (await axios.get(`${Env.get('MS_SECURITY')}/private/pqrs/user/${customer.user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })).data

    return { ...theCustomer.toJSON(), user, PaymentMethod, Pqrs };
  }

  /**
   * Actualiza un cliente
   * @param {HttpContextContract} params - parametros dados por Url
   * @param {HttpContextContract} request - peticion del usuario
   * @returns {Customer} - lo que devuelve la solicitud de guardado
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    let token = await this.get_token(request)
    const theCustomer: Customer = await Customer.findOrFail(params.id)
    theCustomer.contactEmergency = body.contactEmergency;
    let user = (await axios.put(`${Env.get('MS_SECURITY')}/private/users/${theCustomer.user_id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })).data
    let customer = await theCustomer.save()
    return { ...customer.toJSON(), user };
  }

  /**
   * elimina un cliente
   * @param {HttpContextContract} params - parametros dados por Url
   * @param {HttpContextContract} response - respuesta para el usuario
   * @returns {Customer} - lo que devuelve la solicitud de eliminacion
   */
  public async destroy({ params, response, request }: HttpContextContract) {
    try {
      let token = await this.get_token(request)
      let theCustomer: Customer = await Customer.findOrFail(params.id)
      let theCustomerSerialze = theCustomer.serialize()
      let payment: Object[] = (await axios.get(`${Env.get('MS_SECURITY')}/private/paymentmethod/user/${theCustomerSerialze.user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).data
      payment.forEach(async pay => {
        await axios.delete(`${Env.get('MS_SECURITY')}/private/paymentmethod/${pay["_id"]}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

      })


      let pqrs: Object[] = (await axios.get(`${Env.get('MS_SECURITY')}/private/pqrs/user/${theCustomerSerialze.user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).data

      pqrs.forEach(async pqr => {
        await axios.delete(`${Env.get('MS_SECURITY')}/private/pqrs/${pqr["_id"]}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      });

      console.log(pqrs, theCustomer.user_id)
      await axios.delete(`${Env.get('MS_SECURITY')}/private/users/${theCustomerSerialze.user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      await theCustomer.delete()
      response.status(204)
      return response
    } catch (error) {
      console.log(error)
      return response.status(504)
    }
  }

  public async findByUserId({ params }: HttpContextContract){
    const theCustomer: Customer = await Customer.query().where("user_id", params.user_id).firstOrFail()
    return theCustomer
  }
}
