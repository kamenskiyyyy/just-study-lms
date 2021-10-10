import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LessonsEntity } from '../lessons/lessons.entity';
import { UserEntity } from '../user/user.entity';

@Entity('assignment')
export class AssignmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  watched: boolean;

  @Column({ default: false })
  block: boolean;

  @OneToMany(() => LessonsEntity, (lesson) => lesson.assignments)
  lesson: LessonsEntity;

  @ManyToOne(() => UserEntity, (user) => user.usersToAssignment)
  student: UserEntity;
}
