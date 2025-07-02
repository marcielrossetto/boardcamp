import { Router } from "express";
import { 
    getRentals, 
    getRentalById,
    postRental, 
    returnRental, 
    deleteRental 
} from "../controllers/rental.controller.js";

const rentalRouter = Router();

rentalRouter.get("/rentals", getRentals);
rentalRouter.get("/rentals/:id", getRentalById);
rentalRouter.post("/rentals", postRental);
rentalRouter.post("/rentals/:id/return", returnRental);
rentalRouter.delete("/rentals/:id", deleteRental);

export default rentalRouter;
