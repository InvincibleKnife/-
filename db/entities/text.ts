import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Usersay } from "./say";
import { User } from "./user";
@Entity({ name: "text" })
export class Text extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;
  //设置级联，保存一个全都保存
  @ManyToOne(() => User)
  @JoinColumn({ name: "userid" })
  userid!: User;
  @Column()
  title!: string;
  @Column()
  text!: string;
  @Column()
  yesor!: number;
  @Column()
  see!: number;
  @Column()
  addtime!: Date;
  @Column()
  sumtime!: Date;
  @Column()
  like!: number;
}
