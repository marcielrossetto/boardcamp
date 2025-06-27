import { Router } from "express";
import { rentalSchema } from "../schema/rental.schema.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { getRentals, postRental } from "../controllers/rental.controller.js";

const rentalRouter = Router();

rentalRouter.post("/rentals", validateSchema(rentalSchema), postRental);
rentalRouter.get("/rentals", getRentals);

export default rentalRouter;
