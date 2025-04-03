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

// 🔹 Public Routes (No authentication needed)
router.post("/register", registerUser); // Anyone can register (Students by default)
router.post("/login", loginUser); // Login for both students and admins

// 🔹 Student Routes (Authenticated Users)
router.get("/profile", authenticateJWT, getAllUsers); // View own profile (Needs implementation)
router.put("/users/:id", authenticateJWT, putUser); // Edit own profile

// 🔹 Admin Routes (Only Admins Can Access)
router.get("/admin/users", authenticateJWT, authorizeAdmin, getAllUsers); // Admin can see all users
router.put("/promote", authenticateJWT, authorizeAdmin, promoteToAdmin); // Admin can promote users to admin
router.delete("/users/:id", authenticateJWT, authorizeAdmin, deleteUser); // Admin can delete users
router;
export default router;

// else if (req.user?.role === "student") {
//     // Admin can see all users
//     const id = req.user.id
//     const users = await userRepository.findOneBy({ id:id });
//     console.log(users);

//     res.status(200).json(users);
// }

// if (!user) {
//     res.status(404).json({ message: "User not found" });
//     return;
// }

// export const getStudent =async (req:AuthenticatedRequest,res:Response): Promise<void>=>{
//     const userId = parseInt(req.params.id);

//     try {
//         const userRepository = AppDataSource.getRepository(Users);
//         const user = await userRepository.findOne({ where: { id: userId } });

//         if (!user) {
//             res.status(404).json({ message: "User not found" });
//             return;
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "cant find student", error });
//     }
// }
