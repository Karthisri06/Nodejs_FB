import "reflect-metadata";
import { DataSource, Migration } from "typeorm";
import { User } from "./entity/User"; 
import { BankDetails } from "./entity/seeder";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost", 
  port: 3306, 
  username: "root",
  password: "123Test@",
  database: "test1",
  synchronize: false, 
  logging: true,
  entities: [User],
  migrations: [`${process.cwd()}/src/migration/*.ts`],  
//  subscribers: [], 
});

// Establishing connection with the database
export const connectDB = async () => {
  try {
    await AppDataSource.initialize(); // Initialize the DataSource
    console.log("Data Source has been initialized!");
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
};
