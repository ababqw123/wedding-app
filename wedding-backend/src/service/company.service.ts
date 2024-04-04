import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyInfo } from 'src/interface/companyInfo';
import { WeddingInfo } from 'src/interface/weddingInfo';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('CompanyInfo')
    private readonly companyModel: Model<CompanyInfo>,
    @InjectModel('WeddingInfo')
    private readonly weddingModel: Model<WeddingInfo>,
  ) {}
  async getAllCompany() {
    return await this.companyModel.find().exec();
  }

  async getAllWedding() {
    return await this.weddingModel.find().exec();
  }

  async getFindWedding(id: string) {
    return await this.weddingModel.findOne({ _id: id });
  }

  async postCompany() {
    const testCompany = {
      name: '회사 4호점',
      addr: '대구 서구 평리로 221',
      phone: '010-1111-2121',
      hallList: [
        {
          name: '1관',
          floor: 2,
          size: 'SMALL',
        },
      ],
    };

    const createCompany = new this.companyModel(testCompany);
    return await createCompany.save();
  }
}
