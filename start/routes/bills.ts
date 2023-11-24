import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
<<<<<<< HEAD
    Route.post("/bill","BillsController.store");
    Route.post("/bill/list","BillsController.storeList");
    Route.get("/bill","BillsController.index");
    Route.get("/bill/:id","BillsController.show");
    Route.put("/bill/:id","BillsController.update");
    Route.delete("/bill/:id","BillsController.destroy");
}
).middleware(['security'])
=======
    Route.post("/bills","BillsController.store");
    Route.get("/bills","BillsController.index");
    Route.get("/bills/:id","BillsController.show");
    Route.put("/bills/:id","BillsController.update");
    Route.delete("/bills/:id","BillsController.destroy");
})//.middleware(['security'])
>>>>>>> 2eb262a83343c8e3dfc4376d0afdf009e6253585
