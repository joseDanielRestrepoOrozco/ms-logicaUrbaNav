import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/ratings","RatingsController.store");
    Route.get("/ratings","RatingsController.index");
    Route.get("/ratings/:id","RatingsController.show");
    Route.put("/ratings/:id","RatingsController.update");
    Route.delete("/ratings/:id","RatingsController.destroy");
})//.middleware(['security'])
