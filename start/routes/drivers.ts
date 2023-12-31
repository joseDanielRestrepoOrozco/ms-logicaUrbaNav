import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/drivers","DriversController.store");
    Route.post("/driver/list","DriversController.storeList");
    Route.get("/drivers","DriversController.index");
    Route.get("/drivers/:id","DriversController.show");
    Route.get("/drivers2/:id","DriversController.showForUser")
    Route.put("/drivers/:id","DriversController.update");
    Route.delete("/drivers/:id","DriversController.destroy");
})//.middleware(['security'])
