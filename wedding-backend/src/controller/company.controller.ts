import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CompanyInfo } from 'src/interface/companyInfo';
import { CompanyService } from 'src/service/company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('/getAllCompany')
  async getAllCompany() {
    const company = await this.companyService.getAllCompany();

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
    const wedding = await this.companyService.postCompany(body);
    return wedding;
  }

  @Put('editCompanyInfo')
  async editCompany(@Body() body: CompanyInfo) {
    const wedding = await this.companyService.putCompany(body);
    return true;
  }
}
