import { db } from "../database/database.js";

function findGmaByName(name) {
    return decodeURI.query('SELECT FROM games WHERE name=$1;' , [name]);
}

function insertGame(name, image, stockTotal, pricePerDay) {
    return db.query(
        'INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);',
        [name, image, stockTotal, pricePerDay]
    );
}
function getGames () {
    return db.query('SELECTE * FROM games;');
}

export const gameRepository = { findGmaByName, insertGame, getGames}