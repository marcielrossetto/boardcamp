import { gameService } from "../services/game.service.js";

export async function postGame(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body;
    await gameService.creatGame(name, image, stockTotal, pricePerDay);
    res.sendStatus(201);  
}

export async function getGames(req,res) {
    const games = await gameService.listGame();
    res.send(games);
}