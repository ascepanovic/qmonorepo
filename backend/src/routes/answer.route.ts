import express from "express";
import { isAuthorized } from "../middleware/isAuthorized";
import {
  getAllAnswersController,
  getAnswerByIdController,
  createAnswerController,
  updateAnswerController,
  deleteAnswerController,
} from "./../controllers/answer.controller";

const router = express.Router();

router.use(isAuthorized);

/**
 * @swagger
 * /answer:
 *   get:
 *     summary: Get all answers
 *     tags: [Answer]
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Error retrieving answers
 */
router.get("/", getAllAnswersController);
/**
 * @swagger
 * /answer/{id}:
 *   get:
 *     summary: Get a answer by ID
 *     tags: [Answer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: answer ID
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: answer not found
 */
router.get("/:id", getAnswerByIdController);
/**
 * @swagger
 * /answer:
 *   post:
 *     summary: Create a new answer
 *     tags: [Answer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               isCorrect:
 *                 type: boolean
 *               questionId:
 *                 type: number
 *     responses:
 *       201:
 *         description: answer created successfully
 *       400:
 *         description: Invalid answer data
 */
router.post("/", createAnswerController);
/**
 * @swagger
 * /answer/{id}:
 *   put:
 *     summary: Update a answer by ID
 *     tags: [Answer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the answer to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               isCorrect:
 *                 type: boolean
 *               questionId:
 *                 type: number
 *     responses:
 *       200:
 *         description: answer updated successfully
 *       400:
 *         description: Invalid answer data
 *       404:
 *         description: answer not found
 */
router.put("/:id", updateAnswerController);
/**
 * @swagger
 * /answer/{id}:
 *   delete:
 *     summary: Delete a answer by ID
 *     tags: [Answer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: answer ID
 *     responses:
 *       200:
 *         description: answer deleted successfully
 *       404:
 *         description: answer not found
 */
router.delete("/:id", deleteAnswerController);

export { router as answerRouter };
