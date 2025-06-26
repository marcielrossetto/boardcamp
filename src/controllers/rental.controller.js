import { rentalService } from "../services/rental.service.js";

export async function getRentals(req, res) {
    const rentals = await rentalService.listRentals();
    res.send(rentals);
}

export async function postRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    await rentalService.createRental(customerId, gameId, daysRented);
    res.sendStatus(201);
}

export async function finishRental(req, res) {
    const { id } = req.params;
    await rentalService.finishExistingRental(id);
    res.sendStatus(200);
}

export async function deleteRental(req, res) {
    const { id } = req.params;
    await rentalService.deleteExistingRental(id);
    res.sendStatus(200);
}