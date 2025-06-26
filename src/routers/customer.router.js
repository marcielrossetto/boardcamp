import { Router } from "express";
import { getCustomers, getCustomerById, postCustomer } from "../controllers/customer.controller.js";
import { validateSchema } from "../middleware/validateSchema.middleware.js";
import { customerSchema } from "../schema/customer.schema.js";

const customerRouter = Router();

customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getCustomerById);
customerRouter.post("/customers", validateSchema(customerSchema), postCustomer);

export default customerRouter;