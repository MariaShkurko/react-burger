export type APIError = {
  status: number; // Обязательно!
  message: string;
  reason?: string;
};

export type ResultResponse<T> = {
  success: boolean;
  data: T;
};
