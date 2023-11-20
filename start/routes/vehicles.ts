import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/vehicle","VehiclesController.store");
    Route.post("/vehicle/list","VehiclesController.storeList");
    Route.get("/vehicle","VehiclesController.index");
    Route.get("/vehicle/:id","VehiclesController.show");
    Route.put("/vehicle/:id","VehiclesController.update");
    Route.delete("/vehicle/:id","VehiclesController.destroy");
}).middleware(['security'])
