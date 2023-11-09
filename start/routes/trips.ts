import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/trip","TripsController.store");
    Route.post("/trip/list","TripsController.storeList");
    Route.post("/trip/user/:id","TripsController.CreateOnlyDriver");
    Route.get("/trip","TripsController.index");
    Route.get("/trip/:id","TripsController.show");
    Route.put("/trip/:id","TripsController.update");
    Route.delete("/trip/:id","TripsController.destroy");
}
)
