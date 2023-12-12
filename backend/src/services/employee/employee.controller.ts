import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/test')
  async getEmployee(): Promise<EmployeeDto> {
    const employee = await this.employeeService.getEmployeeData();
    return employee;
  }
}
