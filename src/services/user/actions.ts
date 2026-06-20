import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from '../api/auth-api.js';
import { isTokenExists } from '../api/token.js';
import { setIsAuthChecked, setUser } from './user-slice.js';

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    try {
      if (isTokenExists()) {
        const response = await dispatch(
          authApi.endpoints.getUser.initiate(undefined, { forceRefetch: true })
        );

        if (response.data) {
          dispatch(setUser(response.data));
        }
      }
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  }
);
