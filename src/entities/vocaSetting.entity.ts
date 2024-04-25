import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { User } from './user.entity';

@Entity('voca_settings')
export class VocaSetting extends BaseEntity {
  @Column({ default: 10 })
  learn_word_amount: number;

  @Column({ default: 15 })
  review_word_amount: number;

  @Column({ default: 30 })
  quick_review_word_amount: number;

  @Column({ default: true })
  is_audio_quiz: boolean;

  @OneToOne(() => User, (user) => user.voca_settings)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
