/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.post("/bill","BillsController.store");
Route.get("/bill","BillsController.index");
Route.get("/bill/:id","BillsController.show");
Route.put("/bill/:id","BillsController.update");
Route.delete("/bill/:id","BillsController.destroy");



Route.post("/point","PointsController.store");
Route.get("/point","PointsController.index");
Route.get("/point/:id","PointsController.show");
Route.put("/point/:id","PointsController.update");
Route.delete("/point/:id","PointsController.destroy");



Route.post("/rating","RatingsController.store");
Route.get("/rating","RatingsController.index");
Route.get("/rating/:id","RatingsController.show");
Route.put("/rating/:id","RatingsController.update");
Route.delete("/rating/:id","RatingsController.destroy");