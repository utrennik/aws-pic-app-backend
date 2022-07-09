export class QueueError extends Error {
  public statusCode: number;
  public message: string;
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = 'QueueError';
    this.statusCode = 500;
  }
}
