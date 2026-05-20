import { HOST_API, URLs } from '@/utils/URLs';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { TCreateOrderRequest, TCreateOrderResponse } from './type';
import type { TIngredient } from '@/utils/types';

export const burgerApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: HOST_API,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
    },
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredient[], void>({
      query: () => ({
        url: URLs.ingredients,
      }),
      transformResponse: (response: { data: TIngredient[] }) => response.data,
    }),
    createOrder: builder.mutation<TCreateOrderResponse, TCreateOrderRequest>({
      query: (body) => ({
        url: URLs.createOrder,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetIngredientsQuery, useCreateOrderMutation } = burgerApi;
