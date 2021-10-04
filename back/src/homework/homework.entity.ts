import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LessonsEntity } from '../lessons/lessons.entity';

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

  @Column({ default: false })
  done: boolean;

  @Column()
  body: string;

  @Column({ default: false })
  watched: boolean;

  @Column({ default: false })
  block: boolean;

  @Column({ default: false })
  isPublished: boolean;

  @ManyToOne(() => LessonsEntity, (lesson) => lesson.homeworks)
  lesson: LessonsEntity;
}
