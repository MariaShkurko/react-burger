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
