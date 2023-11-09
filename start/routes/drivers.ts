import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/driver","DriversController.store");
    Route.post("/driver/list","DriversController.storeList");
    Route.get("/driver","DriversController.index");
    Route.get("/driver/:id","DriversController.show");
    Route.put("/driver/:id","DriversController.update");
    Route.delete("/driver/:id","DriversController.destroy");
})//.middleware(['security'])
