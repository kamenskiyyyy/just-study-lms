import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CoursesEntity } from '../courses/courses.entity';
import { HomeworkEntity } from '../homework/homework.entity';
import { AssignmentEntity } from '../assignment/assignment.entity';

@Entity('lessons')
export class LessonsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  numbering: number;

  @Column('text', { array: true })
  file: string[];

  @Column()
  body: string;

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

  @ManyToOne(() => CoursesEntity, (course) => course.lessons)
  course: CoursesEntity;

  @ManyToOne(() => AssignmentEntity, (assignment) => assignment.lesson, {
    eager: true,
  })
  assignments: AssignmentEntity;

  @OneToMany(() => HomeworkEntity, (homework) => homework.lesson, {
    eager: true,
  })
  homeworks: HomeworkEntity[];
}
