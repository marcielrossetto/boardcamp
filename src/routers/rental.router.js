import { Router } from "express";
import { 
    getRentals, 
    postRental, 
    returnRental, 
    deleteRental 
} from "../controllers/rental.controller.js";

const rentalRouter = Router();

rentalRouter.get("/rentals", getRentals);
rentalRouter.post("/rentals", postRental);
rentalRouter.post("/rentals/:id/return", returnRental);
rentalRouter.delete("/rentals/:id", deleteRental);

export default rentalRouter;
0