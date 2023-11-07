import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/rating","RatingsController.store");
    Route.post("/rating/list","RatingsController.storeList");
    Route.get("/rating","RatingsController.index");
    Route.get("/rating/:id","RatingsController.show");
    Route.put("/rating/:id","RatingsController.update");
    Route.delete("/rating/:id","RatingsController.destroy");
}
)