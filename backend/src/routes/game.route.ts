import express from "express";
import { isAuthorized } from "../middleware/isAuthorized";
import {
  findAllGamesController,
  findGameByIdController,
  createGameController,
  updateGameController,
  deleteGameController,
} from "./../controllers/game.controller";

const router = express.Router();

router.use(isAuthorized);

/**
 * @swagger
 * /api/game:
 *   get:
 *     summary: Get all games
 *     tags: [Game]
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Error retrieving games
 */
router.get("/", findAllGamesController);
/**
 * @swagger
 * /api/game/{id}:
 *   get:
 *     summary: Get a game by ID
 *     tags: [Game]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: game ID
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: game not found
 */
router.get("/:id", findGameByIdController);
/**
 * @swagger
 * /api/game:
 *   post:
 *     summary: Create a new game
 *     tags: [Game]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               socketId:
 *                 type: string
 *               categoryId:
 *                 type: number
 *     responses:
 *       201:
 *         description: game created successfully
 *       400:
 *         description: Invalid game data
 */

router.post("/", isAuthorized, createGameController);
/**
 * @swagger
 * /api/game/{id}:
 *   put:
 *     summary: Update a game by ID
 *     tags: [Game]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the game to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                status:
 *                 type: string
 *                 enum:
 *                   - ACTIVE
 *                   - WAITING
 *                   - FINISHED
 *     responses:
 *       200:
 *         description: game updated successfully
 *       400:
 *         description: Invalid game data
 *       404:
 *         description: game not found
 */
router.put("/:id", updateGameController);

/**
 * @swagger
 * /api/game/{id}:
 *   delete:
 *     summary: Delete a game by ID
 *     tags: [Game]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: game ID
 *     responses:
 *       200:
 *         description: game deleted successfully
 *       404:
 *         description: game not found
 */
router.delete("/:id", deleteGameController);

export { router as gameRouter };
