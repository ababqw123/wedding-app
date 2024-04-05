import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CompanyInfo } from 'src/interface/companyInfo';
import { HallInfo } from 'src/interface/hallInfo';
import { WeddingInfo } from 'src/interface/weddingInfo';
import { CompanyService } from 'src/service/company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('/getAllCompany')
  async getAllCompany() {
    const company = await this.companyService.getAllCompany();
    company.forEach((it) => {
      const enabledHall = it.hallList.filter((hall) => hall.enabled);
      it.hallList = enabledHall;
    });

    return company;
  }

  @Get('/findAllWedding')
  async getAllWedding() {
    const wedding = await this.companyService.getAllWedding();
    return wedding;
  }

  @Post('/findWedding')
  async getFindWedding(@Body() body: { id: string }) {
    const wedding = await this.companyService.getFindWedding(body.id);
    return wedding;
  }

  @Post('saveCompanyInfo')
  async saveCompany(@Body() body: CompanyInfo) {
    const company = await this.companyService.postCompany(body);
    return company;
  }

  @Post('insertHall')
  async saveHall(
    @Body()
    body: {
      companyId: string;
      hallInfo: HallInfo;
    },
  ) {
    const hall = await this.companyService.postHall(
      body.companyId,
      body.hallInfo,
    );
    return hall;
  }

  @Post('insertWedding')
  async saveWedding(@Body() body: WeddingInfo) {
    const date = new Date(body.date);
    date.setHours(body.time);
    body.date = date.toString();
    const wedding = await this.companyService.postWedding(body);
    await this.companyService.postMoney(wedding._id);
    return wedding;
  }

  @Put('saveMoney')
  async saveMoney(
    @Body()
    body: {
      select: string;
      token: string;
      name: string;
      phone: string;
      money: number;
    },
  ) {
    const wedding = await this.companyService.getFindWedding(body.token);
    const congratuMoney = await this.companyService.getFindMoney(body.token);
    if (body.select === wedding.people.groomName) {
      congratuMoney.groom.push({
        name: body.name,
        phone: body.phone,
        money: body.money,
      });
      congratuMoney.groomMoney += body.money;
      congratuMoney.totalMoney += body.money;
    } else {
      congratuMoney.bride.push({
        name: body.name,
        phone: body.phone,
        money: body.money,
      });
      congratuMoney.brideMoney += body.money;
      congratuMoney.totalMoney += body.money;
    }
    await this.companyService.putMoney(congratuMoney);
    return true;
  }

  @Put('editCompanyInfo')
  async editCompany(@Body() body: CompanyInfo) {
    const company = await this.companyService.putCompany(body);
    return company;
  }

  @Put('editHall')
  async editHall(
    @Body()
    body: {
      _id: string;
      companyId: string;
      name: string;
      size: string;
      floor: number;
    },
  ) {
    const hall = await this.companyService.putHall(body);
    return hall;
  }

  @Put('editWedding')
  async editWedding(
    @Body()
    body: WeddingInfo,
  ) {
    const wedding = await this.companyService.putWedding(body);
    return wedding;
  }

  @Delete('delCompanyInfo')
  async delCompany(@Body() body: CompanyInfo) {
    const company = await this.companyService.deleteCompany(body);
    return company;
  }

  @Delete('delHall')
  async delHall(
    @Body()
    body: {
      _id: string;
      companyId: string;
      name: string;
      size: string;
      floor: number;
    },
  ) {
    const hall = await this.companyService.deleteHall(body);
    return hall;
  }

  @Delete('delWeddingInfo')
  async delWedding(@Body() body: { id: string }) {
    const wedding = await this.companyService.deleteWedding(body);
    return wedding;
  }
}
