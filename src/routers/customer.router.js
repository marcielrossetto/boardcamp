import { Router } from "express";
import { getCustomers, postCustomer } from "../controllers/customer.controller.js";
import { customerSchema } from "../schema/customer.schema.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";

const customerRouter = Router();

customerRouter.post("/customers", validateSchema(customerSchema), postCustomer);
customerRouter.get("/customers", getCustomers);

export default customerRouter;
