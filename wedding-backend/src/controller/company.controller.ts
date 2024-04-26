import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { objectToString, stringToObject } from 'src/function';
import { CompanyInfo } from 'src/interface/companyInfo';
import { HallInfo } from 'src/interface/hallInfo';
import { WeddingInfo } from 'src/interface/weddingInfo';
import { decodeAES256, encodeAES256 } from 'src/secret/AES256';
import { SetAES } from 'src/secret/AESKeySetting';
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

  @Get('/findAllWeddingId')
  async getAllWeddingId() {
    const weddingId = await this.companyService.getAllMoneyId();
    const aes256Setting = await SetAES.setting();
    const filter: {
      weddingId: string;
      groomId: string;
      brideId: string;
    }[] = [];
    weddingId.forEach((it) => {
      filter.push({
        weddingId: it.weddingId,
        groomId: encodeAES256(
          objectToString({ id: it._id, key: 'groom' }),
          aes256Setting,
        ),
        brideId: encodeAES256(
          objectToString({ id: it._id, key: 'bride' }),
          aes256Setting,
        ),
      });
    });
    return filter;
  }

  @Get('/findAllMoneyToken')
  async getAllTokenId() {
    const weddingId = await this.companyService.getAllMoneyId();
    const aes256Setting = await SetAES.setting();
    const filter: string[] = [];
    weddingId.forEach((it) => {
      filter.push(
        encodeAES256(
          objectToString({ id: it._id, key: 'groom' }),
          aes256Setting,
        ),
      );
      filter.push(
        encodeAES256(
          objectToString({ id: it._id, key: 'bride' }),
          aes256Setting,
        ),
      );
    });

    return filter;
  }

  @Get('/congratulatoryMoney/:token')
  async getCongratulatoryMoney(@Param('token') token: string) {
    const aes256Setting = await SetAES.setting();
    try {
      const value: { id: string; key: string } = stringToObject(
        decodeAES256(token, aes256Setting),
      );
      const money = await this.companyService.getFindMoneyById(value.id);
      if (money != undefined) {
        const wedding = await this.companyService.getFindWedding(
          money.weddingId,
        );
        let participant: {
          _id?: string;
          name?: string;
          phone?: string;
          money?: number;
          ticket?: number;
        }[] = [];
        let totalMoney: number = 0;
        if (value.key === 'groom') {
          participant = money.groom;
          totalMoney = money.groomMoney;
        } else {
          participant = money.bride;
          totalMoney = money.brideMoney;
        }
        return {
          wedding: {
            _id: wedding._id,
            groomName: wedding.people.groomName,
            brideName: wedding.people.brideName,
          },
          congratulatoryMoney: {
            participant: participant,
            total: money.totalMoney,
          },
        };
      } else {
        return false;
      }
    } catch (exp) {
      return false;
    }
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
      ticket: number;
    },
  ) {
    const wedding = await this.companyService.getFindWedding(body.token);
    const congratuMoney = await this.companyService.getFindMoney(body.token);
    if (body.select === wedding.people.groomName) {
      congratuMoney.groom.push({
        name: body.name,
        phone: body.phone,
        money: body.money,
        ticket: body.ticket,
      });
      congratuMoney.groomMoney += body.money;
      congratuMoney.totalMoney += body.money;
    } else {
      congratuMoney.bride.push({
        name: body.name,
        phone: body.phone,
        money: body.money,
        ticket: body.ticket,
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
    const date = new Date(body.date);
    date.setHours(body.time);
    body.date = date.toString();
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
