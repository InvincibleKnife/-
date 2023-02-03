import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user";
@Entity({ name: "new_user" })
export class New_user extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;
  //设置级联，保存一个全都保存
  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: "userid" })
  userid!: User;
  @Column()
  phone!: string;
  @Column()
  QQ!: string;
  @Column()
  git!: string;
}
