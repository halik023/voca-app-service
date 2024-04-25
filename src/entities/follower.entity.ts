import { Entity, ManyToOne, JoinColumn, Unique } from 'typeorm';

import { BaseEntity } from 'src/common/base.entity';
import { User } from './user.entity';

@Entity('followers')
@Unique(['following', 'follower'])
export class Follower extends BaseEntity {
  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'following_id' })
  following: User;

  @ManyToOne(() => User, (user) => user.followings)
  @JoinColumn({ name: 'follower_id' })
  follower: User;
}
