import { Router } from "express";
import { registerUser, loginUser ,putUser, deleteUser} from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
import { getAllUsers } from "../controllers/auth.controller";

const router = Router();

router.post("/register",registerUser,);
router.post("/login", loginUser)
router.get("/profile", authenticateJWT,);
router.put("/edit/:id",putUser,);
router.delete("/delete/:id",deleteUser,);
router.get("/users", getAllUsers);


export default router;
