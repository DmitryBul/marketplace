import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() user: Partial<User>): Promise<User> {
    return this.usersService.create(user);
  }
}
