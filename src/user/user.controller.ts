import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.findById(params.id);
  }

  @Post()
  create(@Body() user: User) {
    return this.service.create(user);
  }

  @Put(':id')
  update(@Param() params, @Body() user: User) {
    return this.service.update(params.id, user);
  }

  @Delete(':id')
  remove(@Param() params) {
    return this.service.remove(params.id);
  }
}
