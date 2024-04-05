import { Module } from '@nestjs/common';
import { CompanyController } from '../controller/company.controller';
import { CompanyService } from '../service/company.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyInfoSchema } from 'src/schema/companyInfo';
import { WeddingInfoSchema } from 'src/schema/weddingInfo';
import { CongratulatoryMoneySchema } from 'src/schema/congratulatoryMoney';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'CompanyInfo',
        schema: CompanyInfoSchema,
      },
      {
        name: 'WeddingInfo',
        schema: WeddingInfoSchema,
      },
      {
        name: 'CongratulatoryMoney',
        schema: CongratulatoryMoneySchema,
      },
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
