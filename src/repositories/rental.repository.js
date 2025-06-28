import { db } from "../database/database.js";

function getRentals() {
    return db.query(`
        SELECT 
            rentals.*,
            customers.id AS "customerId",
            customers.name AS "customerName",
            games.id AS "gameId",
            games.name AS "gameName"
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id;
    `);
}

function getRentalById(id) {
    return db.query(`
        SELECT * FROM rentals
        WHERE id = $1;
    `, [id]);
}

function getRentalWithGamePrice(id) {
    return db.query(`
        SELECT rentals.*, games."pricePerDay"
        FROM rentals
        JOIN games ON rentals."gameId" = games.id
        WHERE rentals.id = $1;
    `, [id]);
}

function getOpenRentalsByGameId(gameId) {
    return db.query(`
        SELECT *
        FROM rentals
        WHERE "gameId" = $1
          AND "returnDate" IS NULL;
    `, [gameId]);
}

function insertRental(customerId, gameId, daysRented, rentDate, originalPrice) {
    return db.query(`
        INSERT INTO rentals 
            ("customerId", "gameId", "daysRented", "rentDate", "returnDate", "originalPrice", "delayFee")
        VALUES
            ($1, $2, $3, $4, null, $5, null);
    `, [customerId, gameId, daysRented, rentDate, originalPrice]);
}

function finishRental(id, returnDate, delayFee) {
    return db.query(`
        UPDATE rentals
        SET "returnDate" = $1,
            "delayFee" = $2
        WHERE id = $3;
    `, [returnDate, delayFee, id]);
}

function deleteRentalById(id) {
    return db.query(`
        DELETE FROM rentals
        WHERE id = $1;
    `, [id]);
}

export const rentalRepository = {
    getRentals,
    getRentalById,
    getRentalWithGamePrice,
    getOpenRentalsByGameId,
    insertRental,
    finishRental,
    deleteRentalById
};
