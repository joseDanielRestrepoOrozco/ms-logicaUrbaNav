import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios'
export default class Security {

  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    let theRequest = request.toJSON()
    console.log(theRequest);
    // Sacar el token de un usuario (RECORDAR ESTA LINEA, ES UTIL)
    if (theRequest.headers.authorization) {
      let token = theRequest.headers.authorization.replace("Bearer ", "")
    let data: object = {
      url: theRequest.url,
      method: theRequest.method
    }
    try {
      // llamo al endpoint que está en el MS_SECURITY
      // a esta peticion tengo que ponerle tambien un token porque se debe autenticar (con bearer token)
      
      const result = await axios.post(`${Env.get('MS_SECURITY')}/api/public/security/permissions-validation`, data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      // el MS_SECURITY me devuelve algo o nada para saber si fue exitosa la autenticación
      console.log("La respuesta de MS_SECURITY >" + result.data + "<")
      if (result.data == "") {
        console.log("no puede ingresar")
        return response.status(401)
      } else {
        console.log(result.data)
        await next()
      }
    } catch (error) {
      console.error(error)
      return response.status(401)
    }
  
    } else {
      response.status(401)
    }
  }
  }