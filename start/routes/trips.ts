import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/trips","TripsController.store");
    Route.get("/trips","TripsController.index");
    Route.get("/trips/:id","TripsController.show");
    Route.put("/trips/:id","TripsController.update");
    Route.delete("/trips/:id","TripsController.destroy");
    Route.post("/trips/list","TripsController.storeList");
    Route.post("/trips/user/:id","TripsController.CreateOnlyDriver");
    
    Route.get("/trips/:customer_id","TripsController.indexByCustomer");
    
    Route.get("/trips/:driver_id","TripsController.indexByDriver");
    
})//.middleware(['security'])
