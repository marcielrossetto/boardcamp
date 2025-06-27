import { Router } from "express";
import { getGames, postGame } from "../controllers/game.controller.js";
import { gameSchema } from "../schema/game.schema.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";

const gameRouter = Router();

gameRouter.post("/games", validateSchema(gameSchema), postGame);
gameRouter.get("/games", getGames);

export default gameRouter;
