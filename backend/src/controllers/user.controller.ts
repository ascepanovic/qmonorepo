import { Request, Response } from "express";
import {
  create,
  deleteUser,
  findAll,
  findById,
  update,
} from "../services/user.service";
import { handleResponseError } from "../utils/global";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAll();
    return res.send(users).status(200);
  } catch (error) {
    handleResponseError(res, error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);
  try {
    const user = await findById(userId);
    if (!user) {
      console.error("User not found");
      return res.status(404).send("User not found");
    }
    return res.send(user).status(200);
  } catch (error) {
    handleResponseError(res, error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, photo } = req.body;

  try {
    const newUser = await create({ name, email, photo });
    return res.send(newUser).status(201);
  } catch (error) {
    console.error(error);
    handleResponseError(res, error);
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  const { name, photo } = req.body;

  try {
    const updatedUser = await update(userId, {
      name,
      photo,
    });

    if (!updatedUser) {
      console.error("User not found");
      return res.status(404).send("User not found");
    }

    return res.send(updatedUser).status(200);
  } catch (error) {
    handleResponseError(res, error);
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  try {
    const deletedUser = await deleteUser(userId);

    if (!deletedUser) {
      console.error("User not found");
      return res.status(404).send("User not found");
    }

    return res.send(deletedUser).status(200);
  } catch (error) {
    handleResponseError(res, error);
  }
};
