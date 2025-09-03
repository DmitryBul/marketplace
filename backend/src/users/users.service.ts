import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<User> {
  const user = await this.repo.findOneBy({ id });
  if (!user) {
    throw new NotFoundException(`User with id ${id} not found`);
  }
  return user;
}

  create(user: Partial<User>): Promise<User> {
    const newUser = this.repo.create(user);
    return this.repo.save(newUser);
  }
}
