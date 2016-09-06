export class UploadedFile {
  id: string;
  status: number;
  statusText: string;
  progress: number;
  originalName: string;
  size: number;
  response: string;
  done: boolean;
  error: boolean;
  abort: boolean;

  constructor(id: string, originalName: string, size: number) {
    this.id = id;
    this.originalName = originalName;
    this.size = size;
    this.progress = 0;
    this.done = false;
    this.error = false;
    this.abort = false;
  }

  setError(): void {
    this.error = true;
    this.done = true;
  }

  setAbort(): void {
    this.abort = true;
    this.done = true;
  }

  onFinished(status: number, statusText: string, response: string): void {
    this.status = status;
    this.statusText = statusText;
    this.response = response;
    this.done = true;
  }
}