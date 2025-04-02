import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    console.log("Registered")

    try {
        const userRepository =AppDataSource. getRepository(User);

        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "User with this email already exists!" });
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await userRepository.save(newUser);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
        return 
    } catch (error) {
        res.status(500).json({ message: "Error during registration", error });
        return 
    }
};

export const loginUser = async (req: Request, res: Response):Promise<void> => {
    const { email, password } = req.body;
    console.log('hi');
    try {
      console.log(req.body)
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
             res.status(400).json({ message: "Invalid password" });
             return
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            process.env.JWT_SECRET!, 
            { expiresIn: "7d" } 
        );

        res.status(200).json({
            message: "Login successful",
            token
        });
        return
    } catch (error) {
         res.status(500).json({ message: "Error during login", error });
         return
    }

};

export const putUser=async(req: Request, res: Response):Promise<void> => {
    const userId = parseInt(req.params.id); 
    const { name, email } = req.body; 

    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({where:{id:userId}});
      if (!user) {
       res.send({ message: "User not found" });
       return ;
      }
      if (name) user.name = name;
      if (email) user.email = email;

      await userRepository.save(user);

     res.status(200).json(user);
     return;
    } catch (error) {
      console.error("Error updating user:", error);
      res.send({ message: "Error updating user" });
      return ;
}

};
export const deleteUser=async (req: Request, res: Response) :Promise<void> =>{
    const userId = req.params.id;  

    try {
      const userRepository = AppDataSource.getRepository(User);
      
      const user = await userRepository.findOne({ where: { id: +userId } });
      if (!user) {
        res.send({ message: "User not found" });
        return;
      }
      await userRepository.delete(user.id);
     res.send({ message: "User successfully deleted" });
     return ;
    } catch (error) {
      console.error("Error deleting user:", error);
      res.send({ message: "Error deleting user" });
      return ;
    }
  };
  export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find({ select: ["id", "name", "email"] }); // Exclude password
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  };
  
