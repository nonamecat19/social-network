import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { AppService } from './app.service'

//@Controller('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get/:id')
  // getHello(@Param('id', ParseIntPipe) id: number) {
  //   return id;
    //return this.appService.getHello()
  //}

  @Post('create')
  create(@Body() dto: {num: number}) {
    //console.log('post')
    return 'post'
  }

}
