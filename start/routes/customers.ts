import Route from '@ioc:Adonis/Core/Route'

/**
 * Proteccion de rutas
 */
Route.group(() => {
    Route.post("/customer","CustomersController.store");
    Route.get("/customer","CustomersController.index");
    Route.get("/customer/:id","CustomersController.show");
    Route.put("/customer/:id","CustomersController.update");
    Route.delete("/customer/:id","CustomersController.destroy");
}
)