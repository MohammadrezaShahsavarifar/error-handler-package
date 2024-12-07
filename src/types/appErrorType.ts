export type AppError = {
  message: string;
  statusCode: number;
  status: string;
  isOperational: boolean;
  code?: number;
  path?: string;
  value?: string;
};
