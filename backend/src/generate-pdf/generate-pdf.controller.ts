import { Controller, Get, Param } from '@nestjs/common';
import { GeneratePdfService } from './generate-pdf.service';

@Controller('generate')
export class GeneratePdfController {
  constructor(private readonly generatePdf: GeneratePdfService) {}

  @Get('/pdf/:id')
  GeneratePdfService(@Param('id') id: string) {
    return this.generatePdf.generatePdfExample(+id);
  }

  @Get('/test')
  Test() {
    return this.generatePdf.Test();
  }
}
