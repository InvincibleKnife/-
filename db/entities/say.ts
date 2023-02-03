import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToOne,
} from "typeorm";
import { User } from "./user";
import { Text } from "./text";

@Entity({ name: "usersay" })
export class Usersay extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;
  @OneToOne(() => User)
  userid!: User;
  @Column()
  text!: string;
  @Column()
  textid!: number;
}
