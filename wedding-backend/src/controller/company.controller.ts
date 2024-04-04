import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
}
