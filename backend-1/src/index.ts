
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


// Enable cors at the server side. 
const corsOption = {
    origin: '*',
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: '*',
    optionsSuccessStatus: 202,
    'Access-Control-Allow-Origin': '*'    
}
app.use(cors());
// app.use(cors());



app.use(express.json());
// app.use("/user", routers);
// app.use("/auth", router);
app.get('/' , (req, res) => {
  console.log('list');
  res.send({
    message: 'hi'
  })
})
const port: number = 6000;
app.listen(port, async () => {
  try {
    await AppDataSource.initialize();
    console.log("connected to mysql");
    console.log('Server running on port 6000');
  } catch (error) {
    console.log("database error", error);
  }
});





