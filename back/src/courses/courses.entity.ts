import {
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PassEntity } from '../pass/pass.entity';
import { LessonsEntity } from '../lessons/lessons.entity';

@Entity({ name: 'courses' })
export class CoursesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('text', { array: true, default: [] })
  category: string[];

  @Column({ default: true })
  isPublished: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @OneToMany(() => PassEntity, (user) => user.course)
  coursesToUsers: PassEntity[];

  @OneToMany(() => LessonsEntity, (lesson) => lesson.course, { eager: true })
  lessons: LessonsEntity[];
}
