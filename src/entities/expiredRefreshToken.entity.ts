import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';

@Entity('expired_refresh_tokens')
export class ExpiredRefreshToken extends BaseEntity {
  @Column()
  refresh_token: string;
}
