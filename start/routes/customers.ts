import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/customers","CustomersController.store");
    Route.post("/customers/user/:id","CustomersController.CreateOnlyCustomer");
    Route.get("/customers","CustomersController.index");
    Route.post("/customers/list","CustomersController.storeList");
    Route.get("/customers/:id","CustomersController.show");
    Route.put("/customers/:id","CustomersController.update");
    Route.delete("/customers/:id","CustomersController.destroy");
})//.middleware(['security'])
