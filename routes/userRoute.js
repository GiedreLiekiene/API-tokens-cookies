import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  deleteAllUsers,
} from "../controller/userController.js";

const router = express.Router();

router.get("/get", getAllUsers);

router.get("/get/:id", getUserById);

router.delete("/delete/:id", deleteUserById);

router.put("/update/:id", updateUser);

router.delete("/delete", deleteAllUsers);

export default router;
