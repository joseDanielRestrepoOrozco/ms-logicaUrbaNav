import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/points","PointsController.store");
    Route.get("/points","PointsController.index");
    Route.get("/points/:id","PointsController.show");
    Route.put("/points/:id","PointsController.update");
    Route.delete("/points/:id","PointsController.destroy");
})//.middleware(['security'])
