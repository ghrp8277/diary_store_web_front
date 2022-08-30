import { AxiosError } from 'axios';

export default class AxiosServiceError extends Error {
  error: AxiosError;
  status: number;
  payload?: any;

  constructor(error: AxiosError, message?: string) {
    super(message);
    this.name = 'AxiosServiceError';

    this.error = error;
    const status = error.response?.status;
    if (status) this.status = status;
    else this.status = 0;
  }
}
