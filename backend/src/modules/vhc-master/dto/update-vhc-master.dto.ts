import { PartialType } from '@nestjs/mapped-types';
import { CreateVhcMasterDto } from './create-vhc-master.dto';

export class UpdateVhcMasterDto extends PartialType(CreateVhcMasterDto) {}
