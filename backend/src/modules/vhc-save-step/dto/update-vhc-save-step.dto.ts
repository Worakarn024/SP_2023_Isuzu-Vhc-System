import { PartialType } from '@nestjs/mapped-types';
import { CreateVhcSaveStepDto } from './create-vhc-save-step.dto';

export class UpdateVhcSaveStepDto extends PartialType(CreateVhcSaveStepDto) {}
