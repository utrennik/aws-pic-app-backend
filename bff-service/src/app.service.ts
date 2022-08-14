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
      url: AppService.generateReqerstUrl(serviceUrl, url),
      body,
      headers: { ...headers, host: '' } as any
    };

    console.log(`GENERATED URL: ${requestConfig.url}`)
    
    try {

      const cachedData = AppService.isCacheableRequest(method, url) && AppService.getCachedData();
      
      if (cachedData) {
        const { status, headers, data } = cachedData;

        res.status(status).set({ ...headers }).send(data);
      } else { 
        const response = await this.httpService.request(requestConfig).toPromise();
        const { status, headers, data } = response;

        AppService.isCacheableRequest(method, url) && AppService.setCachedData({ status, headers, data });
        
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

  private static generateReqerstUrl(serviceUrl: string, url: string): string {
    const serviceUrlPart = AppService.getBaseUrlWithoutParams(url);
    const restUrl = url.replace(`/${serviceUrlPart}`, '');
    return `${serviceUrl}${restUrl}`;
  }

  private static cachedData: { data: any, headers: any, status: string, timestamp: number } = { data: null, headers: {}, status: '', timestamp: 0 };

  private static getCachedData(): any {
    const isCacheExpired = Date.now() - AppService.cachedData.timestamp > CACHE_TIMEOUT_MILLIS;
    const isCached = Boolean(AppService.cachedData.data);

    if (!isCached || isCacheExpired) return null;

    return AppService.cachedData;

  };

  private static setCachedData({status, headers, data }: any): void { 
    if(status >= 400) return;
    AppService.cachedData.status = status;
    AppService.cachedData.headers = headers;
    AppService.cachedData.data = data;
    AppService.cachedData.timestamp = Date.now();
  }

  private static isCacheableRequest(method: string, url: string) {
    return (method === 'GET' && url === `/${CACHED_SERVICE}`)
  }
}
