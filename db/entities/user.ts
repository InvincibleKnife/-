import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Usersay } from "./say";
@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;
  @Column()
  username!: string;
  @Column()
  avatar!: string;
  @Column()
  job!: string;
  @Column()
  inter!: string;
  @Column()
  phone!: string;
}
