import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  get(@Param() params) {
    return this.service.findById(params.id);
  }

  @Post()
  create(@Body() user: User) {
    console.log('user: ' + JSON.stringify(user));
    return this.service.create(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  update(@Param() params, @Body() user: User) {
    return this.service.update(params.id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param() params) {
    return this.service.remove(params.id);
  }
}
