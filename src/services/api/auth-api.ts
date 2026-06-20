import { HOST_API, URLs } from '@/utils/URLs';
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

import type {
  TLoginRequest,
  TLoginResponse,
  TLogoutResponse,
  TRegisterRequest,
  TResetPasswordRequest,
  TResetPasswordResponse,
  TSetPasswordRequest,
  TSetPasswordResponse,
  TTokenRequest,
  TTokenResponse,
  TUserInfo,
  TUserUpdateRequest,
} from './type';

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

type CustomBaseQueryArgs = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
};

const customBaseQuery: BaseQueryFn<
  CustomBaseQueryArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args: CustomBaseQueryArgs, api: BaseQueryApi, extraOptions: object) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: HOST_API,
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        headers.set('Authorization', accessToken);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: URLs.refreshToken,
        method: 'POST',
        body: { token: localStorage.getItem('refreshToken') },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken, refreshToken } = refreshResult.data as RefreshTokenResponse;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    register: builder.mutation<TUserInfo, TRegisterRequest>({
      query: (body: TRegisterRequest) => ({
        url: URLs.register,
        method: 'POST',
        body,
      }),
      transformResponse: (response: TLoginResponse): TUserInfo => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        return response.user;
      },
      invalidatesTags: ['User'],
    }),
    login: builder.mutation<TUserInfo, TLoginRequest>({
      query: (body: TLoginRequest) => ({
        url: URLs.login,
        method: 'POST',
        body,
      }),
      transformResponse: (response: TLoginResponse): TUserInfo => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        return response.user;
      },
      invalidatesTags: ['User'],
    }),
    refreshToken: builder.mutation<TTokenResponse, TTokenRequest>({
      query: (body: TTokenRequest) => ({
        url: URLs.refreshToken,
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<string, void>({
      query: () => ({
        url: URLs.logout,
        method: 'POST',
        body: { token: localStorage.getItem('refreshToken') ?? '' },
      }),
      transformResponse: (response: TLogoutResponse): string => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return response.message;
      },
      invalidatesTags: ['User'],
    }),
    resetPassword: builder.mutation<TResetPasswordResponse, TResetPasswordRequest>({
      query: (body: TResetPasswordRequest) => ({
        url: URLs.resetPassword,
        method: 'POST',
        body,
      }),
      transformResponse: (response: TResetPasswordResponse): TResetPasswordResponse => {
        localStorage.setItem('isGetCode', 'true');
        return response;
      },
    }),
    setPassword: builder.mutation<TSetPasswordResponse, TSetPasswordRequest>({
      query: (body: TSetPasswordRequest) => ({
        url: URLs.setPassword,
        method: 'POST',
        body,
      }),
      transformResponse: (response: TSetPasswordResponse): TSetPasswordResponse => {
        localStorage.removeItem('isGetCode');
        return response;
      },
    }),
    getUser: builder.query<TUserInfo, void>({
      query: () => ({
        url: URLs.user,
        method: 'GET',
      }),
      transformResponse: (response: { user: TUserInfo }): TUserInfo => {
        return response.user;
      },
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<TUserInfo, TUserUpdateRequest>({
      query: (body: TUserUpdateRequest) => ({
        url: URLs.user,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: { user: TUserInfo }): TUserInfo => {
        return response.user;
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useSetPasswordMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = authApi;
