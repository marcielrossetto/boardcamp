import { Router } from "express";
import { getRentals, postRental, finishRental, deleteRental } from "../controllers/rental.controller.js";
import { validateSchema } from "../middleware/validateSchema.middleware.js";
import { rentalSchema } from "../schema/rental.schema.js";

const rentalRouter = Router();

rentalRouter.get("/rentals", getRentals);
rentalRouter.post("/rentals", validateSchema(rentalSchema), postRental);
rentalRouter.post("/rentals/:id/return", finishRental);
rentalRouter.delete("/rentals/:id", deleteRental);

export default rentalRouter;