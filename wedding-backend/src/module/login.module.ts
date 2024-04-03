import { Module } from '@nestjs/common';
import { LoginController } from '../controller/login.controller';
import { LoginService } from 'src/service/login.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
