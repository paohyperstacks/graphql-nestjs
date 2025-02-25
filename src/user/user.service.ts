import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user-input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRep: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRep.find();
  }

  async findOne(id: number) {
    return await this.userRep.findOneByOrFail({ id });
  }

  async createUser(createUserInput: CreateUserInput) {
    const newUser = this.userRep.create(createUserInput);
    return await this.userRep.save(newUser);
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.userRep.findOneByOrFail({ id })
    return await this.userRep.save(new User(Object.assign(user, updateUserInput)))
  }

  async remove(id:number){
    const result = await this.userRep.delete(id)
    return result.affected === 1
  }

}
