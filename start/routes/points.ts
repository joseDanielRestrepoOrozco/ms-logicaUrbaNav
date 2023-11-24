import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/point","PointsController.store");
    Route.post("/point/list","PointsController.storeList");
    Route.get("/point","PointsController.index");
    Route.get("/point/:id","PointsController.show");
    Route.put("/point/:id","PointsController.update");
    Route.delete("/point/:id","PointsController.destroy");
})//.middleware(['security'])
