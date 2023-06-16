import express from "express";
import { isAuthorized } from "../middleware/isAuthorized";
import {
  getAllQuestionsController,
  getQuestionByIdController,
  createQuestionController,
  updateQuestionController,
  deleteQuestionController,
} from "./../controllers/question.controller";

const router = express.Router();

router.use(isAuthorized);

/**
 * @swagger
 * /api/question:
 *   get:
 *     summary: Get all questions
 *     tags: [Question]
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Error retrieving questions
 */
router.get("/", getAllQuestionsController);
/**
 * @swagger
 * /api/question/{id}:
 *   get:
 *     summary: Get a question by ID
 *     tags: [Question]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: question ID
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: question not found
 */
router.get("/:id", getQuestionByIdController);
/**
 * @swagger
 * /api/question:
 *   post:
 *     summary: Create a new question
 *     tags: [Question]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               categoryId:
 *                 type: number
 *     responses:
 *       201:
 *         description: question created successfully
 *       400:
 *         description: Invalid question data
 */
router.post("/", createQuestionController);
/**
 * @swagger
 * /api/question/{id}:
 *   put:
 *     summary: Update a question by ID
 *     tags: [Question]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the question to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: question updated successfully
 *       400:
 *         description: Invalid question data
 *       404:
 *         description: question not found
 */
router.put("/:id", updateQuestionController);
/**
 * @swagger
 * /api/question/{id}:
 *   delete:
 *     summary: Delete a question by ID
 *     tags: [Question]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: question ID
 *     responses:
 *       200:
 *         description: question deleted successfully
 *       404:
 *         description: question not found
 */
router.delete("/:id", deleteQuestionController);

export { router as questionRouter };
