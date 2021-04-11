import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  home() {
    return '안녕하세요 박상준입니다.';
  }
}
