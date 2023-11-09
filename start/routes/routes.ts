import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/route","RoutesController.store");
    Route.post("/route/list","RoutesController.storeList");
    Route.get("/route","RoutesController.index");
    Route.get("/route/:id","RoutesController.show");
    Route.put("/route/:id","RoutesController.update");
    Route.delete("/route/:id","RoutesController.destroy");
})//.middleware(['security'])
