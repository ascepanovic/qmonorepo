import { Request, Response } from "express";
import {
  create,
  deleteUser,
  findAll,
  findById,
  update,
} from "../services/user.service";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAll();
    return res.send(users).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  try {
    const user = await findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.send(user).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, photo } = req.body;

  try {
    const newUser = await create({ name, email, photo });
    return res.send(newUser).status(201);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
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
      return res.status(404).send("User not found");
    }

    return res.send(updatedUser).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  try {
    const deletedUser = await deleteUser(userId);

    if (!deletedUser) {
      return res.status(404).send("User not found");
    }

    return res.send(deletedUser).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};
