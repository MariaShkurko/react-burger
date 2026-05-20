import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { burgerApi } from '../api/burger-api';
import burgerConstructorReducer from './burger-constructor-slice';
import ingredientDetailsReducer from './ingredient-details-slice';
import orderDetailsReducer from './order-details-slice';

export const store = configureStore({
  reducer: {
    [burgerApi.reducerPath]: burgerApi.reducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(burgerApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
