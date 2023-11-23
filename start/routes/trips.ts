import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/trips","TripsController.store");
    // Route.post("/trips/user/:id","TripsController.CreateOnlyDriver");
    Route.get("/trips","TripsController.index");
    Route.get("/trips/:id","TripsController.show");
    Route.put("/trips/:id","TripsController.update");
    Route.delete("/trips/:id","TripsController.destroy");
})//.middleware(['security'])
