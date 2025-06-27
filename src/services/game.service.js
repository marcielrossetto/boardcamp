import { gameRepository } from "../repositories/game.repository.js";

async function createGame(name, image, stockTotal, pricePerDay) {
    const existGame = await gameRepository.findGameByName(name);
    if (existGame.rowCount > 0) {
        throw { type: "conflict", message: "This game name already exists." };
    }
    return gameRepository.insertGame(name, image, stockTotal, pricePerDay);
}

async function listGame() {
    const games = await gameRepository.getGames();
    return games.rows;
}

export const gameService = { createGame, listGame };
