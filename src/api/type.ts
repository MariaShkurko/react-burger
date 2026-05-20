export type APIError = {
  status: number; // Обязательно!
  message: string;
  reason?: string;
};

export type ResultResponse<T> = {
  success: boolean;
  data: T;
};

export type TCreateOrderRequest = {
  ingredients: string[];
};
export type TCreateOrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};
