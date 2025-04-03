import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Users } from "../entity/User";
import { AppDataSource } from "../data-source";

// Define an extended request type for authentication
interface AuthenticatedRequest extends Request {
  user?: { id: number; role: string };
}


export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(Users);

    // Check if user already exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User with this email already exists!" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with "student" role by default
    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
    });

    await userRepository.save(newUser);

    res.status(201).json({ message: "Student registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error during registration", error });
  }
};

/**
 * @desc Login user and generate JWT token
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(Users);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
};

export const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(Users);

    if (req.user?.role === "admin") {
      
      const users = await userRepository.find({
        select: ["id", "name", "email", "role"],
      });
      res.status(200).json(users);
      return;
    } else if (req.user?.role === "student") {
      
      const id = req.user.id;
      const users = await userRepository.findOneBy({ id: id });
      res.status(200).json(users);
      return;
    }

    // if (!user) {
    //     res.status(404).json({ message: "User not found" });
    //     return;
    // }

    res.status(200).json({ message: "users fetched" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const putUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.id);
  const { name } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(Users);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

   
    if (req.user?.id !== user.id) {
      res
        .status(403)
        .json({ message: "Unauthorized: You can only edit your own profile." });
      return;
    }

    user.name = name || user.name; 

    await userRepository.save(user);
    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};


export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.id);

  try {
    const userRepository = AppDataSource.getRepository(Users);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (req.user?.role !== "admin") {
      res
        .status(403)
        .json({ message: "Access denied: Only admins can delete users." });
      return;
    }

    await userRepository.delete(user.id);
    res.status(200).json({ message: "User successfully deleted." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};


export const promoteToAdmin = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { userId } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(Users);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.role === "admin") {
      res.status(400).json({ message: "User is already an admin." });
      return;
    }

    user.role = "admin"; 
    await userRepository.save(user);

    res.status(200).json({ message: "User promoted to admin successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error promoting user to admin", error });
  }
};

export const getStudent = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.id);

  try {
    const userRepository = AppDataSource.getRepository(Users);
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "cant find student", error });
  }
};
