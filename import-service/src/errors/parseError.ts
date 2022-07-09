export class ParseError extends Error {
  public statusCode: number;
  public message: string;
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = 'ParseError';
    this.statusCode = 400;
  }
}
