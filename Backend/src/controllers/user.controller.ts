import { Request, Response } from "express";
import { AppDataSource } from "../data-source"; 
import { User } from "../entity/User"; 

const userRepository = AppDataSource.getRepository(User);
export class UserController {

  async createUser(req: Request, res: Response) {
    const { name, email }=req.body;
    try {
      const user = new User();
      user.name = name;
      user.email = email;
      const userRepository = AppDataSource.getRepository(User);

      await userRepository.save(user);

      res.send(user);
      return ;
    } catch (error) {
     
      console.error("Error creating user:", error);
      res.send({ message: "Internal server error" });
      return ;
    }
  }

   async getUsers(req: Request, res: Response) {
    try {

      const users = await userRepository.find();

     res.json(users);
     return ;
    } catch (error) {
      console.error("Error fetching users:", error);
      res.send({ message: "Internal server error" });
      return ;
    }
  }
 async putUser(req: Request, res: Response) {
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

}
 async deleteUser(req: Request, res: Response) {
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
  }
}


