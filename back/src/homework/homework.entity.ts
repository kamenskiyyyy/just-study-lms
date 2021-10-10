import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LessonsEntity } from '../lessons/lessons.entity';
import { TasksEntity } from '../tasks/tasks.entity';

@Entity('homeworks')
export class HomeworkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: null })
  description: string;

  @Column({ default: null })
  prompt: string;

  @Column()
  type: 'choiceFromList' | 'writeWord';

  @Column('json', { default: [], nullable: false })
  body: Array<{}>;

  @Column({ default: false })
  isPublished: boolean;

  @ManyToOne(() => LessonsEntity, (lesson) => lesson.homeworks)
  lesson: LessonsEntity;

  @OneToMany(() => TasksEntity, (task) => task.homework)
  tasks: TasksEntity[];
}
