import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { burgerApi } from './api/burger-api';
import { burgerConstructorSlice } from './burger-constructor/burger-constructor-slice';
import { ingredientDetailsSlice } from './ingredient-details/ingredient-details-slice';
import { orderDetailsSlice } from './order/order-details-slice';

import type { AppDispatch, RootState } from './types';

const rootReducer = combineSlices(
  burgerApi,
  ingredientDetailsSlice,
  burgerConstructorSlice,
  orderDetailsSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(burgerApi.middleware);
  },
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
