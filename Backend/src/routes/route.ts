import { Request, Response, Router } from 'express';
import { UserController} from '../controllers/user.controller';
const routers = Router();
const user = new UserController();


routers.post("/postUser",user.createUser);
routers.get("/getUser/:id",user.getUsers);
routers.patch("/updateUser/:id", user.putUser);
routers.delete("/deleteUser/:id", user.deleteUser);
export default routers;
