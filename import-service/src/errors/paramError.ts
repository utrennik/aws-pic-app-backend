export class ParamError extends Error {
  public statusCode: number;
  public message: string;
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = 'ParamError';
    this.statusCode = 400;
  }
}
