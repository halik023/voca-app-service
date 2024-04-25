import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from 'src/common/base.entity';
import { LearnedWord } from './learnedWord.entity';
import { Lesson } from './lesson.entity';

@Entity('vocas')
export class Voca extends BaseEntity {
  @Column()
  en_meaning: string;

  @Column()
  vi_meaning: string;

  @Column({ nullable: true })
  audio: string;

  @Column({ nullable: true })
  note: string;

  @Column()
  type: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.vocas)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @OneToMany(() => LearnedWord, (learnedWord) => learnedWord.voca)
  learned_words: LearnedWord[];
}
