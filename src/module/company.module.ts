import { Module } from '@nestjs/common';
import { CompanyController } from '../controller/company.controller';
import { CompanyService } from '../service/company.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyInfoSchema } from 'src/schema/companyInfo';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'CompanyInfo', schema: CompanyInfoSchema
  }])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
