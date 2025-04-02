import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum UserRole {
  STUDENT = "student",
  ADMIN = "admin",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

}

