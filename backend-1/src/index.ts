
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Request, Response } from "express";
import cors from 'cors';
// import router from "./routes/route";
import router from "./routes/auth.route"
import dotenv from 'dotenv'
dotenv.config()
const app = express();


// // Enable cors at the server side. 
// const corsOption = {
//     origin: '*',
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//     methods: '*',
//     optionsSuccessStatus: 200,
//     'Access-Control-Allow-Origin': '*'    
// }
// app.use(cors(corsOption));
app.use(cors());



app.use(express.json());
// app.use("/user", routers);
app.use("/auth", router);

const port: number = 5002;
app.listen(port, async () => {
  try {
    await AppDataSource.initialize();
    console.log("connected to mysql");
    console.log('Server running on port 5002');
  } catch (error) {
    console.log("database error", error);
  }
});





