import { Request, Response } from "express";
import {
  create,
  findById,
  findAll,
  update,
  deleteCategory,
} from "../services/category.service";
import { handleResponseError } from "../utils/global";

export async function createCategoryController(req: Request, res: Response) {
  const { name } = req.body;

  try {
    const category = await create({ name });
    return res.send(category).status(201);
  } catch (error) {
    console.error(error);
    handleResponseError(res, error);
  }
}

export async function getCategoryByIdController(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const category = await findById(parseInt(id, 10));
    if (category) {
      res.status(200).send(category);
    } else {
      res.status(404).send({ error: "category not found" });
    }
  } catch (error) {
    handleResponseError(res, error);
  }
}

export async function getAllCategoryController(req: Request, res: Response) {
  try {
    const categories = await findAll();
    res.status(200).send(categories);
  } catch (error) {
    handleResponseError(res, error);
  }
}

export async function updateCategoryController(req: Request, res: Response) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await update(parseInt(id, 10), {
      name,
    });
    res.status(200).send(updatedCategory);
  } catch (error) {
    handleResponseError(res, error);
  }
}

export async function deleteCategoryController(req: Request, res: Response) {
  const categoryId: number = parseInt(req.params.id);

  try {
    const deletedCategory = await deleteCategory(categoryId);

    if (!deleteCategory) {
      console.error("category not found");
      return res.status(404).send("category not found");
    }

    return res.send(deletedCategory).status(200);
  } catch (error) {
    handleResponseError(res, error);
  }
}
