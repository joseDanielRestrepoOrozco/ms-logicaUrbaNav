import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/trip","TripsController.store");
    Route.get("/trip","TripsController.index");
    Route.get("/trip/:id","TripsController.show");
    Route.put("/trip/:id","TripsController.update");
    Route.delete("//:id","TripsController.destroy");
}
)