import { HttpException, HttpStatus } from "@nestjs/common";

export class BadGatewayException extends HttpException {
  constructor() {
    super('Cannot process request', HttpStatus.BAD_GATEWAY);
  }
}
