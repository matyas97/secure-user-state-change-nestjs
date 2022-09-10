import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserAlreadyCreated } from './guards/user-created';
import CreateUserDto from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(UserAlreadyCreated)
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }
}
