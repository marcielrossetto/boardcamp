import { gameService } from "../services/game.service.js";

export async function postGame(req, res, next) {
    const { name, image, stockTotal, pricePerDay } = req.body;

    try {
        if (!name || name.trim() === "") {
            throw { type: "bad_request", message: "O campo 'name' é obrigatório e não pode ser vazio." };
        }

        if (!stockTotal || isNaN(stockTotal) || stockTotal <= 0) {
            throw { type: "bad_request", message: "O campo 'stockTotal' deve ser número maior que zero." };
        }

        if (!pricePerDay || isNaN(pricePerDay) || pricePerDay <= 0) {
            throw { type: "bad_request", message: "O campo 'pricePerDay' deve ser número maior que zero." };
        }

        await gameService.createGame(name, image, stockTotal, pricePerDay);
        res.sendStatus(201);

    } catch (error) {
        next(error);
    }
}

export async function getGames(req, res, next) {
    try {
        const games = await gameService.listGame();
        res.send(games);
    } catch (error) {
        next(error);
    }
}
