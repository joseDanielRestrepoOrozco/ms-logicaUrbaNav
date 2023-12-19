import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/routes","RoutesController.store");
    Route.post("/route/list","RoutesController.storeList");
    Route.get("/routes","RoutesController.index");
    Route.get("/routes/:id","RoutesController.show");
    Route.put("/routes/:id","RoutesController.update");
    Route.delete("/routes/:id","RoutesController.destroy");
})//.middleware(['security'])
