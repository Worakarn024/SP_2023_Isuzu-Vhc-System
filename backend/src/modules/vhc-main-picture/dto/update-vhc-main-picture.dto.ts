import { PartialType } from '@nestjs/mapped-types';
import { CreateVhcMainPictureDto } from './create-vhc-main-picture.dto';

export class UpdateVhcMainPictureDto extends PartialType(CreateVhcMainPictureDto) {}
