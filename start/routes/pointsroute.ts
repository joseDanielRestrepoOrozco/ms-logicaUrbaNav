import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/points-route","PointsRoutesController.store");
    Route.get("/points-route","PointsRoutesController.index");
    Route.get("/points-route/:id","PointsRoutesController.show");
    Route.put("/points-route/:id","PointsRoutesController.update");
    Route.delete("/points-route/:id","PointsRoutesController.destroy");
})//.middleware(['security'])