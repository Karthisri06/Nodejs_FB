import { AppDataSource } from "../data-source"; 
import { BankDetails } from "../entity/seeder"; 
import { DataSource } from "typeorm";
import { Users } from "../entity/User";
import bcrypt from "bcryptjs";


const seedDatabase = async () => {
  await AppDataSource.initialize();
  console.log("Database connected! Seeding users...");

  const userRepository = AppDataSource.getRepository(Users);

  // Admin user
  const existingAdmin = await userRepository.findOneBy({ email: "admin@example.com" });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = userRepository.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });
    await userRepository.save(adminUser);
    console.log("Admin user created!");
  }

  // Student user
  const existingStudent = await userRepository.findOneBy({ email: "student@example.com" });
  if (!existingStudent) {
    const hashedPassword = await bcrypt.hash("student123", 10);
    const studentUser = userRepository.create({
      name: "Student User",
      email: "student@example.com",
      password: hashedPassword,
      role: "student",
    });
    await userRepository.save(studentUser);
    console.log(" Student user created!");
  }
};

seedDatabase().catch((err) => console.error("Seeding failed:", err));
