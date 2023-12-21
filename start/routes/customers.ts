import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/customers","CustomersController.store");
    Route.post("/customers/user/:id","CustomersController.CreateOnlyCustomer");
    Route.get("/customers","CustomersController.index");
    Route.get("/customers2/:id","CustomersController.showForUser");
    Route.post("/customers/list","CustomersController.storeList");
    Route.get("/customers/:id","CustomersController.show");
    Route.put("/customers/:id","CustomersController.update");
    Route.delete("/customers/:id","CustomersController.destroy");
    Route.get("/customers/user/:user_id", "CustomersController.findByUserById");

})//.middleware(['security'])
