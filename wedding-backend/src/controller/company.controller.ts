import { Controller, Get, Param, Query } from '@nestjs/common';
import { CompanyService } from 'src/service/company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService,
    ) {}

  @Get('/getAllCompany')
  async getAllCompany() {
    const company = await this.companyService.getAllCompany();

    return company
  }

  @Get('/findWedding')
  async getFindWedding(@Query() data:string) {
    const wedding = await this.companyService.getAllWedding();
    return wedding
  }
}
