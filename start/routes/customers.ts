import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/customer","CustomersController.store");
    Route.post("/customer/user/:id","CustomersController.CreateOnlyCustomer");
    Route.get("/customer","CustomersController.index");
    Route.post("/customer/list","CustomersController.storeList");
    Route.get("/customer/:id","CustomersController.show");
    Route.put("/customer/:id","CustomersController.update");
    Route.delete("/customer/:id","CustomersController.destroy");
}
)