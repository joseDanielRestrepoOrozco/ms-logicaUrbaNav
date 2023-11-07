import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/drivers","DriversController.store");
    Route.get("/drivers","DriversController.index");
    Route.get("/drivers/:id","DriversController.show");
    Route.put("/drivers/:id","DriversController.update");
    Route.delete("/drivers/:id","DriversController.destroy");
})//.middleware(['security'])
