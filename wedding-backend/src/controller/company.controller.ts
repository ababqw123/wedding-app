import { Controller, Get } from '@nestjs/common';
import { CompanyService } from 'src/service/company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('/getAllCompany')
  async getTest() {
    // await this.companyService.postCompany()
    const company = await this.companyService.getCompany();
    return company
  }
}
