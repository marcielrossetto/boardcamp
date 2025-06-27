import { db } from "../database/database.js";

function findGameByName(name) {
    return decodeURI('SELECT FROM games WHERE name=$1;' , [name]);
}

function insertGame(name, image, stockTotal, pricePerDay) {
    return db.query(
        'INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);',
        [name, image, stockTotal, pricePerDay]
    );
}
function getGames () {
    return db.query('SELECT * FROM games;');
}

export const gameRepository = { findGameByName, insertGame, getGames}