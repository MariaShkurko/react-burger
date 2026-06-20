import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { authApi } from './api/auth-api';
import { burgerApi } from './api/burger-api';
import { burgerConstructorSlice } from './burger-constructor/burger-constructor-slice';
import { orderDetailsSlice } from './order/order-details-slice';
import { userSlice } from './user/user-slice';

import type { AppDispatch, RootState } from './types';

const rootReducer = combineSlices(
  burgerApi,
  authApi,
  burgerConstructorSlice,
  orderDetailsSlice,
  userSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(burgerApi.middleware, authApi.middleware);
  },
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
