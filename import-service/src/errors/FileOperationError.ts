export class FileOperationError extends Error {
  public statusCode: number;
  public message: string;
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = 'FileOperationError';
    this.statusCode = 500;
  }
}
