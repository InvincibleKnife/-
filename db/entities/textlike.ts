import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { User } from "./user";
@Entity({ name: "textlike" })
export class TextLIST extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;
  //设置级联，保存一个全都保存
  @Column()
  userid!: number;
  @Column()
  textid!: number;
}
