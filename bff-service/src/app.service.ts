import { Injectable, HttpStatus } from '@nestjs/common';
import { Request, Response, response } from 'express';
import { HttpService } from '@nestjs/axios';
import { CACHED_SERVICE, CACHE_TIMEOUT_MILLIS } from './constants'

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }

  async processRequest(req: Request, res: Response): Promise<void> {

    const serviceName = AppService.getServiceNameFromUrl(req.url);
    const serviceUrl = process.env[serviceName];
    
    if (!serviceUrl) {
      res.status(HttpStatus.BAD_GATEWAY).send(`Cannot process request`);
      return;
    }

    const { method, url, body, headers } = req;

    // with host header doesn't work with axios from localhost
    const requestConfig = {
      method,
      url: `${serviceUrl}${url}`,
      body,
      headers: { ...headers, host: '' } as any
    };
    
    try {

      const cachedData = AppService.getCachedData(method, url);
      
      if (cachedData) {
        const response = await this.httpService.request(requestConfig).toPromise();
        const { status, headers, data } = response;

        res.status(status).set({ ...headers }).send(data);
      } else { 
        const response = await this.httpService.request(requestConfig).toPromise();
        const { status, headers, data } = response;

        AppService.setCachedData(data);
        
        res.status(status).set({ ...headers }).send(data);
      }

    } catch (e) {
      const status = e.response ? e.response.status : HttpStatus.INTERNAL_SERVER_ERROR
      res.status(status).send(e.message);
      return;
    }
  }

  private static getServiceNameFromUrl(url: string): string {
    return AppService.getBaseUrlWithoutParams(url).toUpperCase();
  }

  private static getBaseUrlWithoutParams(url: string): string {
    const baseUrl = url.split('/')[1];
    const baseUrlWithoutParams = baseUrl.split('?')[0];

    return baseUrlWithoutParams;
  }

  private static cachedData: { data: any, timestamp: number } = { data: null, timestamp: 0 };

  private static getCachedData(method: string, url: string): any {
    if (!(method === 'GET' && url === `/${CACHED_SERVICE}`)) {
      return null;
    }

    const isCacheExpired = Date.now() - AppService.cachedData.timestamp > CACHE_TIMEOUT_MILLIS;

    return isCacheExpired ? null : AppService.cachedData.data;

  };

  private static setCachedData(data: any) { 
    AppService.cachedData.data = data;
    AppService.cachedData.timestamp = Date.now();
  }
}
;
