import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { Course } from './course.entity';
import { Voca } from './voca.entity';

@Entity('lessons')
export class Lesson extends BaseEntity {
  @Column()
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => Course, (course) => course.lessons)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => Voca, (voca) => voca.lesson)
  vocas: Voca[];
}
