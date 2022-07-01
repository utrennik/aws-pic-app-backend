export class PostError extends Error {
  public statusCode: number;
  public message: string;
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = 'PostError';
    this.statusCode = 500;
  }
}
