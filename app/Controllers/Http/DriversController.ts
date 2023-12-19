import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class DriversController {

  public async get_token(request) {
    let theRequest = request.toJSON()
    let token: string = ''
    if (theRequest.headers.authorization) {
      token = theRequest.headers.authorization.replace("Bearer ", "")
    }
    return token
  }

  /**
 * Almacena la informacion de un usuario
 * @param {HttpContextContract} request - peticion del usuario
 * @returns {Driver} - el cliente con su id
 */
  public async CreateOnlyDriver({ request, params }: HttpContextContract) {
    let body = request.body()
    let token = await this.get_token(request)
    let user = (await axios.get(`${Env.get('MS_SECURITY')}/private/users/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })).data
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 20)
    let drivers = await Driver.query().paginate(page, perPage)
    let seguir = true
    drivers.serialize().data.forEach(driver => {
      if (driver.user_id === params.id) {
        seguir = false
      }
    });
    if (user != "" && seguir) {
      return await this.create(body, token)
    }
    return { response: 404, error: "No se pudo crear el conductor correctamente" };
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
      is_available: body["is_available"],
      vehicle_id: body["vehicle_id"],
      user_id: result.data["_id"]
    }
    let theDriver
    let asignacionRol
    if (result.data != "") {
      theDriver = await Driver.create(bodyCustomer)
      if (theDriver) {
        asignacionRol = await axios.put(`${Env.get('MS_SECURITY')}/private/users/${bodyCustomer.user_id}/role/6546e9c40c4d084e46c328ee`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(asignacionRol)
        return { ...theDriver.toJSON(), user: asignacionRol.data };
      }
    }
    return { response: 404, error: "No se pudo crear el usuario correctamente" };
  }




  /**
* Almacena la informacion de un usuario
* @param {HttpContextContract} request - peticion del usuario
* @returns {Driver} - el cliente con su id
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
    body.forEach(async driver => {
      console.log(driver)
      console.log(await this.create(driver, token))
    });
  }

  /**
  * Lista todas los conductores con paginadores
  * @param {HttpContextContract} request - peticion del conductor
  * @returns {Driver[]} - listado de los conductores con paginadores  
  */
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    let token = await this.get_token(request)
    const perPage = request.input('per_page', 20)
    let drivers = await Driver.query().paginate(page, perPage)
    type DriverInfo = {
      user: any,
      Pqrs: any,
      PaymentMethod: any
    }
    let infoCompleta: DriverInfo[] = []

    for (let driver of drivers.serialize().data) {

      let user = (await axios.get(`${Env.get('MS_SECURITY')}/private/users/${driver.user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).data
      let PaymentMethod = (await axios.get(`${Env.get('MS_SECURITY')}/private/paymentmethod/user/${driver.user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).data
      let Pqrs = (await axios.get(`${Env.get('MS_SECURITY')}/private/pqrs/user/${driver.user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).data

      infoCompleta.push({ ...driver, user, PaymentMethod, Pqrs })
    }

    return { pagination: drivers.serialize().meta, drivers: infoCompleta }
  }


  /**
   * esto puede ayudar cuando se haga la relacion entre conductor y vehiculo
   * @returns 
   */
  // public async show({ params }: HttpContextContract) {
  //     let theDriver: Driver = await Driver.query().where("id", params.id).preload('vehicle').firstOrFail()
  //     return theDriver
  // }

  /**
  * Muestra un conductor dado el id por la url
  * @param {HttpContextContract} params - peticion del usuario
  * @returns {Driver} - un conductor
  */
  public async show({ params }: HttpContextContract) {
    let theDriver: Driver = await Driver.query().where("id", params.id).preload('customers').firstOrFail();
    const customers = await theDriver.related('customers').query()
    const trips = customers.map((customer) => {
      return {
        "date": customer.$extras.pivot_date,
        "price": customer.$extras.pivot_price,
        "status": customer.$extras.pivot_status,
        "route_id": customer.$extras.pivot_route_id,
        "customer": customer.toJSON()
      }
    })
    return { ...theDriver.toJSON(), "trips": trips }
  }




  /**
  * Muestra un conductor dado el id por la url
  * @param {HttpContextContract} params - peticion del usuario
  * @returns {Driver} - un conductor
  */
  public async showForUser({ request, params }: HttpContextContract) {
    let token = await this.get_token(request)
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 20)
    let drivers = await Driver.query().paginate(page, perPage)
    let driver2:any = null
    drivers.serialize().data.forEach((driver)=>{
      console.log(String(driver.user_id).trim() === String(params.id).trim(), driver.user_id, params.id)
      if(String(driver.user_id).trim() === String(params.id).trim()){
        driver2 = driver
      }
    })

    return driver2
  }

  

  /**
  * Actualiza un conductor
  * @param {HttpContextContract} params - parametros dados por Url
  * @param {HttpContextContract} request - peticion del usuario
  * @returns {Driver} - lo que devuelve la solicitud de guardado
  */
  public async update({ params, request }: HttpContextContract) {
    let token = await this.get_token(request)
    const body = request.body()
    const theDriver: Driver = await Driver.findOrFail(params.id)
    theDriver.is_available = body.is_available
    let user = (await axios.put(`${Env.get('MS_SECURITY')}/private/users/${theDriver.user_id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })).data
    let driver = await theDriver.save()
    return { ...driver.toJSON(), user };

  }

  /**
  * elimina un conductor
  * @param {HttpContextContract} params - parametros dados por Url
  * @param {HttpContextContract} response - respuesta para el usuario
  * @returns {Driver} - lo que devuelve la solicitud de eliminacion
  */
  public async destroy({ params, response, request }: HttpContextContract) {
    try {
      let token = await this.get_token(request)
      let theDriver: Driver = await Driver.findOrFail(params.id)
      let theDriverSerialze = theDriver.serialize()
      let payment: Object[] = (await axios.get(`${Env.get('MS_SECURITY')}/private/paymentmethod/user/${theDriverSerialze.user_id}`, {
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


      let pqrs: Object[] = (await axios.get(`${Env.get('MS_SECURITY')}/private/pqrs/user/${theDriverSerialze.user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).data
      pqrs.forEach(async pqr => {
        await axios.delete(`${Env.get('MS_SECURITY')}/private/pqrs/${pqr["_id"]}`)
      });

      console.log(pqrs, theDriver.user_id)
      await axios.delete(`${Env.get('MS_SECURITY')}/private/users/${theDriverSerialze.user_id}`)

      console.log("pase por aca")

      await theDriver.delete()
      response.status(204)
      return response
    } catch (error) {
      console.log(error)
      return response.status(504)
    }
  }
}
