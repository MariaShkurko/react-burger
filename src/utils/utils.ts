import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { SerializedError } from '@reduxjs/toolkit/react';

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
): string | null => {
  if (!error) return null;

  if ('data' in error)
    return typeof error.data === 'string' ? error.data : JSON.stringify(error.data);
  if ('message' in error) return error.message ?? '';

  return JSON.stringify(error);
};
