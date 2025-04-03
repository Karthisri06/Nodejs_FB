import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum UserRole {
  STUDENT = "student",
  ADMIN = "admin",
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;


  @Column({ default: "student" })  
  role: "admin" | "student";
  


}

