import { PartialType } from '@nestjs/mapped-types';
import { CreateVhcSaveChecklistDto } from './create-vhc-save-checklist.dto';

export class UpdateVhcSaveChecklistDto extends PartialType(CreateVhcSaveChecklistDto) {}
