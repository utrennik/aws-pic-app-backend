export class ConnectionError extends Error {
  public statusCode: number;
  public message: string;
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = 'ConnectionError';
    this.statusCode = 500;
  }
}
