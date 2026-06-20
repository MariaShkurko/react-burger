import { HOST_API, URLs } from '@/utils/URLs';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { TCreateOrderRequest, TCreateOrderResponse } from './type';
import type { TIngredient } from '@/utils/types';

export const burgerApi = createApi({
  reducerPath: 'burgerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: HOST_API,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Ingredients', 'Order'],
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredient[], void>({
      query: () => ({
        url: URLs.ingredients,
      }),
      transformResponse: (response: { data: TIngredient[] }) => response.data,
      providesTags: ['Ingredients'],
    }),
    createOrder: builder.mutation<TCreateOrderResponse, TCreateOrderRequest>({
      query: (body) => ({
        url: URLs.createOrder,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const { useGetIngredientsQuery, useCreateOrderMutation } = burgerApi;
