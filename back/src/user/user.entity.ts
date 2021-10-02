import {
  BeforeInsert,
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { hash } from "bcryptjs";
import { PassEntity } from "../pass/pass.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: "user" })
  type: "admin" | "user" | "teacher" | "manager";

  @Column({ default: null })
  firstName: string;

  @Column({ default: null })
  secondName: string;

  @Column()
  birthDate: Date;

  @Column("bigint", { default: null })
  phone: number;

  @Column({ default: null })
  telegram: string;

  @Column({ default: true })
  status: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => PassEntity, (course) => course.user)
  usersToCourses: PassEntity[];
}
