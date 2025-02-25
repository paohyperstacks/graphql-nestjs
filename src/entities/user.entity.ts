import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './post.entity';
import { Profile } from './profile.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/enums/role.enums';

@ObjectType()
@Entity()
export class User {

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial)
  }

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  email: string;

  @Field(() => Role)
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER
  })
  role: Role

  @Field(() => Profile)
  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: Promise<Profile>;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Promise<Post[]>;
}
