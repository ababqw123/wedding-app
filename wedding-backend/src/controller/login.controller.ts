import { Controller, Get, Inject } from '@nestjs/common';

@Controller('login')
export class LoginController {
  constructor() {}

  @Get()
  async getTest() {}
}
