import { Router } from "express";
import { getCustomers, getCustomerById, postCustomer } from "../controllers/customer.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { customerSchema } from "../schemas/customer.schema.js";

const customerRouter = Router();

customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getCustomerById);
customerRouter.post("/customers", validateSchema(customerSchema), postCustomer);

export default customerRouter;