import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyInfo } from 'src/interface/companyInfo';
import { CongratulatoryMoney } from 'src/interface/congratulatoryMoney';
import { HallInfo } from 'src/interface/hallInfo';
import { WeddingInfo } from 'src/interface/weddingInfo';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('CompanyInfo')
    private readonly companyModel: Model<CompanyInfo>,
    @InjectModel('WeddingInfo')
    private readonly weddingModel: Model<WeddingInfo>,
    @InjectModel('CongratulatoryMoney')
    private readonly congratulatoryMoneyModel: Model<CongratulatoryMoney>,
  ) {}
  async getAllCompany() {
    return await this.companyModel
      .find({
        enabled: true,
      })
      .exec();
  }

  async getAllWedding() {
    return await this.weddingModel
      .find({
        enabled: true,
      })
      .exec();
  }

  async getFindWedding(id: string) {
    return await this.weddingModel.findOne({ _id: id });
  }

  async getFindMoney(id: string) {
    return await this.congratulatoryMoneyModel.findOne({ weddingId: id });
  }
  async getFindMoneyById(id: string) {
    return await this.congratulatoryMoneyModel.findOne({ _id: id });
  }

  async getAllWeddingId() {
    return await this.congratulatoryMoneyModel.find().exec();
  }

  async postCompany(company: CompanyInfo) {
    return await new this.companyModel(company).save();
  }

  async postHall(companyId: string, hallInfo: HallInfo) {
    const company = await this.companyModel.findOne({ _id: companyId });
    company.hallList.push(hallInfo);
    return await new this.companyModel(company).save();
  }

  async postWedding(wedding: WeddingInfo) {
    return await new this.weddingModel(wedding).save();
  }

  async postMoney(weddingId: string) {
    const congratulatoryMoney: CongratulatoryMoney = {
      weddingId: weddingId,
    };
    return await new this.congratulatoryMoneyModel(congratulatoryMoney).save();
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

  async putHall(hall: {
    _id: string;
    companyId: string;
    name: string;
    size: string;
    floor: number;
  }) {
    const company = await this.companyModel.findOne({ _id: hall.companyId });
    const hallIndex = company.hallList.findIndex((it) => it._id == hall._id);

    company.hallList[hallIndex].name = hall.name;
    company.hallList[hallIndex].size = hall.size;
    company.hallList[hallIndex].floor = hall.floor;
    return await new this.companyModel(company).save();
  }

  async putWedding(wedding: WeddingInfo) {
    const findWedding = await this.weddingModel.findOne({ _id: wedding._id });

    findWedding.date = wedding.date;
    findWedding.company = wedding.company;
    findWedding.hall = wedding.hall;
    findWedding.people = wedding.people;
    return await new this.weddingModel(findWedding).save();
  }

  async putMoney(congratulatoryMoney: CongratulatoryMoney) {
    return await new this.congratulatoryMoneyModel(congratulatoryMoney).save();
  }

  async deleteCompany(company: CompanyInfo) {
    return await this.companyModel.updateOne(
      { _id: company._id },
      {
        $set: {
          enabled: false,
        },
      },
    );
  }

  async deleteHall(hall: {
    _id: string;
    companyId: string;
    name: string;
    size: string;
    floor: number;
  }) {
    const company = await this.companyModel.findOne({ _id: hall.companyId });
    const hallIndex = company.hallList.findIndex((it) => it._id == hall._id);

    company.hallList[hallIndex].enabled = false;
    return await new this.companyModel(company).save();
  }

  async deleteWedding(id: { id: string }) {
    return await this.weddingModel.updateOne(
      { _id: id.id },
      {
        $set: {
          enabled: false,
        },
      },
    );
  }
}
