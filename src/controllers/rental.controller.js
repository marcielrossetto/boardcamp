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

export async function returnRental(req, res, next) {
    const { id } = req.params;

    try {
        await rentalService.finishExistingRental(Number(id));
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
}


export async function deleteRental(req, res) {
    const { id } = req.params;
    await rentalService.deleteExistingRental(id);
    res.sendStatus(200);
}

export async function getRentalById(req, res, next) {
    const { id } = req.params;

    try {
        const rental = await rentalService.getRentalById(Number(id));

        if (!rental) {
            return res.status(404).send("Rental not found");
        }

        res.send(rental);
    } catch (error) {
        next(error);
    }
}
