import express from "express";
import { isAuthorized } from "../middleware/isAuthorized";
import {
  getAllCategoryController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "./../controllers/category.controller";

const router = express.Router();

router.use(isAuthorized);

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Error retrieving categories
 */
router.get("/", getAllCategoryController);

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: category ID
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: category not found
 */
router.get("/:id", getCategoryByIdController);

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: category created successfully
 *       400:
 *         description: Invalid category data
 */
router.post("/", createCategoryController);

/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: category updated successfully
 *       400:
 *         description: Invalid category data
 *       404:
 *         description: category not found
 */

router.put("/:id", updateCategoryController);

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: category ID
 *     responses:
 *       200:
 *         description: category deleted successfully
 *       404:
 *         description: category not found
 */
router.delete("/:id", deleteCategoryController);

export { router as categoryRouter };
