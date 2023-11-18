import { IUserGithub } from '#/domain';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FullText } from '../decorators';

@FullText<IUserGithub>('name', 'login', 'bio', 'email', 'twitterUsername', 'company')
@Entity('user_github')
export class UserGithubEntity implements IUserGithub {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  login: string | null;

  @Column({ type: 'integer', name: 'followers_count', nullable: true })
  followersCount: number | null;

  @Column({ type: 'integer', name: 'following_count', nullable: true })
  followingCount: number | null;

  @Column({ type: 'integer', name: 'public_repos_count', nullable: true })
  publicReposCount: number | null;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 100, name: 'twitter_username', nullable: true })
  twitterUsername: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  company: string | null;

  @Column({ type: 'text', name: 'blog_url', nullable: true })
  blogUrl: string | null;
}
