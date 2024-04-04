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

  async postCompany(company: CompanyInfo) {
    return await new this.companyModel(company).save();
  }

  async putCompany(company: CompanyInfo) {
    return await this.companyModel.updateOne(
      { _id: company._id },
      {
        $set: {
          name: company.name,
          phone: company.phone,
          addr: company.addr,
          hallList: company.hallList,
        },
      },
    );
  }
}
