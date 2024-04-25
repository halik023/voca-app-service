import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { RegisteredCourse } from './registeredCourse.entity';
import { Voca } from './voca.entity';

@Entity('learned_words')
@Unique(['voca', 'register_course'])
export class LearnedWord extends BaseEntity {
  @Column({ default: 0 })
  progress: number;

  @Column({ default: false })
  is_difficult: string;

  @Column({ default: false })
  is_skip: string;

  @ManyToOne(() => Voca, (voca) => voca.learned_words)
  @JoinColumn({ name: 'voca_id' })
  voca: Voca;

  @ManyToOne(
    () => RegisteredCourse,
    (registeredCourse) => registeredCourse.learned_words,
  )
  @JoinColumn({ name: 'register_course_id' })
  register_course: RegisteredCourse;
}
