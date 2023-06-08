import { Request, Response } from "express";
import {
  deleteGame,
  findById,
  findAll,
  create,
  update,
  getPlayersInGame,
} from "./../services/game.service";
import { handleResponseError } from "../utils/global";
import { UserInterface } from "../services/user.service";

export const findAllGamesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const games = await findAll();
    res.status(200).send(games);
  } catch (error) {
    handleResponseError(res, error);
  }
};

export const findGameByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const gameId = parseInt(req.params.id);
  try {
    const game = await findById(gameId);
    if (game) {
      res.json(game);
    } else {
      res.status(404).send({ error: "Game not found" });
    }
  } catch (error) {
    handleResponseError(res, error);
  }
};

export const createGameController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { socketId, categoryId } = req.body;
    let userId: number;
    if (req.user) {
      userId = (req.user as UserInterface).id;
      const game = await create(socketId, categoryId, userId);

      res.send(game).status(201);
    }
  } catch (error) {
    handleResponseError(res, error);
  }
};

export const updateGameController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const gameId = parseInt(req.params.id);
  const { status } = req.body;
  try {
    const game = await update(gameId, status);
    res.status(200).send(game);
  } catch (error) {
    handleResponseError(res, error);
  }
};

export async function deleteGameController(req: Request, res: Response) {
  const gameId: number = parseInt(req.params.id);

  try {
    const deletedGame = await deleteGame(gameId);

    if (!deletedGame) {
      return res.status(404).send("Game not found");
    }

    return res.send(deletedGame).status(200);
  } catch (error) {
    handleResponseError(res, error);
  }
}
