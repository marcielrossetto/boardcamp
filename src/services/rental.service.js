import dayjs from "dayjs";
import { rentalRepository } from "../repositories/rental.repository.js";
import { gameRepository } from "../repositories/game.repository.js";
import { customerRepository } from "../repositories/customer.repository.js";

async function listRentals() {
    const result = await rentalRepository.getRentals();
    return result.rows.map(r => ({
        id: r.id,
        customerId: r.customerId,
        gameId: r.gameId,
        rentDate: dayjs(r.rentDate).format('YYYY-MM-DD'),
        daysRented: r.daysRented,
        returnDate: r.returnDate ? dayjs(r.returnDate).format('YYYY-MM-DD') : null,
        originalPrice: r.originalPrice,
        delayFee: r.delayFee,
        customer: {
            id: r.customerId,
            name: r.customerName
        },
        game: {
            id: r.gameId,
            name: r.gameName
        }
    }));
}

async function createRental(customerId, gameId, daysRented) {
    // Verificar se o cliente existe
    const customer = await customerRepository.getCustomerById(customerId);
    if (customer.rowCount === 0) {
        throw { type: "not_found", message: "Customer not found" };
    }

    // Verificar se o jogo existe
    const game = await gameRepository.getGameById(gameId);
    if (game.rowCount === 0) {
        throw { type: "not_found", message: "Game not found" };
    }

    const gameDetails = game.rows[0];

    // Verificar disponibilidade do jogo
    const openRentals = await rentalRepository.getOpenRentalsByGameId(gameId);
    if (openRentals.rowCount >= gameDetails.stockTotal) {
        throw { type: "unprocessable_entity", message: "Game is out of stock" };
    }

    if (daysRented <= 0) {
        throw { type: "bad_request", message: "daysRented must be greater than zero" };
    }

    const rentDate = dayjs().format('YYYY-MM-DD');
    const originalPrice = daysRented * gameDetails.pricePerDay;

    await rentalRepository.insertRental(
        customerId,
        gameId,
        daysRented,
        rentDate,
        originalPrice
    );
}

async function finishExistingRental(id) {
    const rentalResult = await rentalRepository.getRentalById(id);
    if (rentalResult.rowCount === 0) {
        throw { type: "not_found", message: "Rental not found" };
    }

    const rental = rentalResult.rows[0];
    if (rental.returnDate !== null) {
        throw { type: "unprocessable_entity", message: "Rental already finished" };
    }

    const returnDate = dayjs();
    const rentDate = dayjs(rental.rentDate);
    const dueDate = rentDate.add(rental.daysRented, "day");

    const daysLate = returnDate.diff(dueDate, "day");
    const delayFee = daysLate > 0
        ? daysLate * (rental.originalPrice / rental.daysRented)
        : 0;

    await rentalRepository.finishRental(
        id,
        returnDate.format("YYYY-MM-DD"),
        delayFee
    );
}

export async function deleteExistingRental(id) {
    const rentalResult = await rentalRepository.getRentalById(id);

    if (rentalResult.rowCount === 0) {
        throw { type: "not_found", message: "Rental not found" };
    }

    const rental = rentalResult.rows[0];

    if (rental.returnDate === null) {
        throw { type: "bad_request", message: "Cannot delete an open rental" };
    }

    await rentalRepository.deleteRentalById(id);
}
async function getRentalById(id) {
    const rentalResult = await rentalRepository.getRentalById(id);
    if (rentalResult.rowCount === 0) {
        return null;
    }

    const r = rentalResult.rows[0];

    return {
        id: r.id,
        customerId: r.customerId,
        gameId: r.gameId,
        rentDate: dayjs(r.rentDate).format('YYYY-MM-DD'),
        daysRented: r.daysRented,
        returnDate: r.returnDate ? dayjs(r.returnDate).format('YYYY-MM-DD') : null,
        originalPrice: r.originalPrice,
        delayFee: r.delayFee,
        customer: {
            id: r.customerId,
            name: r.customerName
        },
        game: {
            id: r.gameId,
            name: r.gameName
        }
    };
}

export const rentalService = {
    listRentals,
    createRental,
    finishExistingRental,
    deleteExistingRental,
    getRentalById
};
