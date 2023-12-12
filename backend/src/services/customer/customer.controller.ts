import { Controller, Get, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // @Get('/vhc/:vhcMainId') // This sets the route for this handler, e.g., '/customers/vhc/:vhcMainId'
  // async getVhcData(
  //   @Param('vhcMainId') vhcMainId: number,
  // ): Promise<CustomerDto> {
  //   return this.customerService.getVhcData(vhcMainId); // Call the service method
  // }

  @Get('/data/:vhcMainId') // This sets the route for this handler, e.g., '/customers/customer/:vhcMainId'
  async getCustomerData(
    @Param('vhcMainId') vhcMainId: number,
  ): Promise<CustomerDto> {
    return this.customerService.getMainCusData(vhcMainId);
  }
}
