import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller('*')
export class AppController {
  constructor(private readonly appService: AppService) { }
  
  @All()
  async processAll(@Req() req: Request, @Res() res: Response): Promise<void> {
     await this.appService.processRequest(req, res);
  }
}
