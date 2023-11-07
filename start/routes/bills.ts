import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/bills","BillsController.store");
    Route.get("/bills","BillsController.index");
    Route.get("/bills/:id","BillsController.show");
    Route.put("/bills/:id","BillsController.update");
    Route.delete("/bills/:id","BillsController.destroy");
})//.middleware(['security'])
