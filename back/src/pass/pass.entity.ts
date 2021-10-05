import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CoursesEntity } from '../courses/courses.entity';

@Entity({ name: 'pass' })
export class PassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  status: boolean;

  @Column()
  paid: boolean;

  @Column({ default: null })
  comment: string;

  @Column()
  type: 'economy' | 'business' | 'first' | 'standard' | 'premium' | 'vip' | 'speaking';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @ManyToOne(() => CoursesEntity, (course) => course.coursesToUsers, {eager: true})
  course: CoursesEntity;

  @ManyToOne(() => UserEntity, (user) => user.usersToCourses, {eager: true})
  owner: UserEntity;
}
