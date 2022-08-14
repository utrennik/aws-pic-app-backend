import { Controller, All, Req, Res, UseFilters } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller('*')
export class AppController {
  constructor(private readonly appService: AppService) { }
  
  @All()
  async processAll(@Req() req: Request, @Res() res: Response): Promise<void> {
     await this.appService.processRequest(req, res);
  }
}
