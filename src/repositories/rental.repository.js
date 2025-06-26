import { db } from "../database/database.js";

// Reutilizando repositórios já existentes para buscar Jogo e Cliente
import { gameRepository } from "./game.repository.js";
import { customerRepository } from "./customer.repository.js";

function getRentals() {
    return db.query(`
      SELECT
        rentals.*,
        customers.id AS "cId",
        customers.name AS "cName",
        games.id AS "gId",
        games.name AS "gName"
      FROM rentals
      JOIN customers ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id;
    `);
}

function getRentalById(id) {
    return db.query(`SELECT * FROM rentals WHERE id=$1;`, [id]);
}

function getOpenRentalsByGameId(gameId) {
    return db.query(`SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;`, [gameId]);
}

function insertRental(customerId, gameId, daysRented, rentDate, originalPrice) {
    return db.query(
        `INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee") 
         VALUES ($1, $2, $3, $4, $5, NULL, NULL);`,
        [customerId, gameId, daysRented, rentDate, originalPrice]
    );
}

function finishRental(id, returnDate, delayFee) {
    return db.query(
        `UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3;`,
        [returnDate, delayFee, id]
    );
}

function deleteRentalById(id) {
    return db.query(`DELETE FROM rentals WHERE id=$1;`, [id]);
}

export const rentalRepository = {
    getRentals,
    getRentalById,
    getOpenRentalsByGameId,
    insertRental,
    finishRental,
    deleteRentalById,
    findGameById: gameRepository.getGameById, // Reutilizando a função
    findCustomerById: customerRepository.getCustomerById // Reutilizando a função
};