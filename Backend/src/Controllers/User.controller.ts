import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source"; 
import { Users} from "../Entity/User"; 

const userRepository = AppDataSource.getRepository(Users);
export class UserController {

  async createUser(req: Request, res: Response ,next:NextFunction) {
    const { name, email }=req.body;
    try {
      const user = new Users();
      user.name = name;
      user.email = email;
      const userRepository = AppDataSource.getRepository(Users);

      await userRepository.save(user);

      res.send(user);
      return ;
    } catch (error) {
     next(error)
    }
  }

   async getUsers(req: Request, res: Response,next:NextFunction) {
    try {

      const users = await userRepository.find();

     res.json(users);
     return ;
    } catch (error) {
      next(error)
    }
  }
 async putUser(req: Request, res: Response, next:NextFunction) {
    const userId = parseInt(req.params.id); 
    const { name, email } = req.body; 

    try {
      const userRepository = AppDataSource.getRepository(Users);
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
      next(error)
}

}
 async deleteUser(req: Request, res: Response,next:NextFunction) {
    const userId = req.params.id;  

    try {
      const userRepository = AppDataSource.getRepository(Users);
      
      const user = await userRepository.findOne({ where: { id: +userId } });
      if (!user) {
        res.send({ message: "User not found" });
        return;
      }
      await userRepository.delete(user.id);
     res.send({ message: "User successfully deleted" });
     return ;
    } catch (error) {
      next(error)
    }
  }
}


