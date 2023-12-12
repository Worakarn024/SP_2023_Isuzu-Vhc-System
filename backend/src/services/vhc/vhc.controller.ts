import { Controller, Get } from '@nestjs/common';
import { VhcService } from './vhc.service';
import { VhcDto } from './dto/vhc.dto';
import { CustomerDto } from './dto/customer.dto';
import { CheckListDto } from './dto/check-list.dto';

@Controller('vhc')
export class VhcController {
  constructor(readonly vhcService: VhcService) {}

  @Get('/test')
  async getVhc(): Promise<VhcDto> {
    const vhc = await this.vhcService.getVhcData();
    return vhc;
  }

  @Get('/customer')
  async getCustomer(): Promise<CustomerDto> {
    const customerData = await this.vhcService.getCustomerData();
    return customerData;
  }

  @Get('/check')
  async getCheck(): Promise<CheckListDto> {
    const checkListData = await this.vhcService.getCheckList();
    return checkListData;
  }
}
