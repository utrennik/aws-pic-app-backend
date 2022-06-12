export class NotFoundError extends Error {
  public statusCode: number;
  public message: string;
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}
