import dayjs from "dayjs";
import { rentalRepository } from "../repositories/rental.repository.js";
import { gameRepository } from "../repositories/game.repository.js"; // Para buscar o preço do jogo

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
            id: r.cId,
            name: r.cName,
        },
        game: {
            id: r.gId,
            name: r.gName
        }
    }));
}

async function createRental(customerId, gameId, daysRented) {
    const customerExists = await customerRepository.getCustomerById(customerId);
    if (customerExists.rowCount === 0) {
        throw { type: "bad_request", message: "Customer not found" }; // O req pede 404, mas semanticamente 400 faz mais sentido para uma foreign key
    }

    const game = await gameRepository.findGameById(gameId); // Reutilizei o do repositório de jogos
    if (game.rowCount === 0) {
        throw { type: "bad_request", message: "Game not found" };
    }

    const gameDetails = game.rows[0];
    const openRentals = await rentalRepository.getOpenRentalsByGameId(gameId);
    
    if (openRentals.rowCount >= gameDetails.stockTotal) {
        throw { type: "unprocessable_entity", message: "Game is out of stock" };
    }

    const rentDate = dayjs().format('YYYY-MM-DD');
    const originalPrice = daysRented * gameDetails.pricePerDay;

    return rentalRepository.insertRental(customerId, gameId, daysRented, rentDate, originalPrice);
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
    const daysLate = returnDate.diff(rentDate.add(rental.daysRented, 'day'), 'day');

    const delayFee = daysLate > 0 ? daysLate * (rental.originalPrice / rental.daysRented) : 0;

    return rentalRepository.finishRental(id, returnDate.format('YYYY-MM-DD'), delayFee);
}

async function deleteExistingRental(id) {
    const rentalResult = await rentalRepository.getRentalById(id);
    if (rentalResult.rowCount === 0) {
        throw { type: "not_found", message: "Rental not found" };
    }

    const rental = rentalResult.rows[0];
    if (rental.returnDate === null) {
        throw { type: "bad_request", message: "Cannot delete an open rental" };
    }

    return rentalRepository.deleteRentalById(id);
}

export const rentalService = { listRentals, createRental, finishExistingRental, deleteExistingRental };