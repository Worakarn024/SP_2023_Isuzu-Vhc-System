import { PartialType } from '@nestjs/mapped-types';
import { CreateAhistoryDto } from './create-ahistory.dto';

export class UpdateAhistoryDto extends PartialType(CreateAhistoryDto) {}
