import { Router } from "express";
import {
  registerUser,
  loginUser,
  putUser,
  deleteUser,
  getAllUsers,
  promoteToAdmin,
  getStudent,
} from "../controllers/auth.controller";
import { authenticateJWT, authorizeAdmin } from "../middleware/auth.middleware";

const router = Router();


router.post("/register", registerUser); 
router.post("/login", loginUser);


router.get("/profile", authenticateJWT, getAllUsers); 
router.put("/users/:id", authenticateJWT, putUser); 


router.get("/admin/users", authenticateJWT, authorizeAdmin, getAllUsers); 
router.put("/promote", authenticateJWT, authorizeAdmin, promoteToAdmin);
router.delete("/users/:id", authenticateJWT, authorizeAdmin, deleteUser); 
router;
export default router;

