import e from "express";
import { gameRepository } from "../repositories/game.repository.js";

async function creatGame(name,image, stockTotal, pricePerDay) {
    const existGame = await gameRepository.findGmaByName(name);
    if (existGame.rowCount > 0){
        throw { type: "conflict", message: "This game name already exists."};
    }
    return gameRepository.insertGame(name, image, stockTotal,pricePerDay);
}

async function listGame() {
    const games = await gameRepository.getGames();
    return games.rows;
}

export const gameService = { creatGame, listGame };