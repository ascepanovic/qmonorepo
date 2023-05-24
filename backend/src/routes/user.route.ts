import express from "express";
import { isAuthorized } from "../middleware/isAuthorized";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/user.controller";

const router = express.Router();

router.use(isAuthorized);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export { router as userRouter };
