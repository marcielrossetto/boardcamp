import { Router  } from "express";
import { getGames, postGame } from "../controllers/game.controller.js";
import { validateSchema } from "../schema/game.schema.js";
import { gameSchema } from "../schema/game.schema.js";

const gameRouter = Router();

gameRouter.post("/games", validateSchema(gameSchema), postGame);
gameRouter.get("/games", getGames);

export default gameRouter;


