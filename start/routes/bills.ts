import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/bill","BillsController.store");
    Route.get("/bill","BillsController.index");
    Route.get("/bill/:id","BillsController.show");
    Route.put("/bill/:id","BillsController.update");
    Route.delete("/bill/:id","BillsController.destroy");
}
)//.middleware(['security'])
