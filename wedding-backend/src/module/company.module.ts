import { Module } from '@nestjs/common';
import { CompanyController } from '../controller/company.controller';
import { CompanyService } from '../service/company.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyInfoSchema } from 'src/schema/companyInfo';
import { WeddingInfoSchema } from 'src/schema/weddingInfo';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'CompanyInfo', schema: CompanyInfoSchema
  },
  {
    name: 'WeddingInfo', schema: WeddingInfoSchema
  }])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
