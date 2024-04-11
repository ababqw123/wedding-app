import { Module } from '@nestjs/common';
import { LoginService } from 'src/service/login.service';
import { LoginController } from '../controller/login.controller';
import { CompanyModule } from './company.module';
import { CompanyService } from 'src/service/company.service';

@Module({
  imports: [CompanyModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
