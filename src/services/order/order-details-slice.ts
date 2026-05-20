import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type OrderDetailsState = {
  order: { number: number } | null;
};

const initialState: OrderDetailsState = {
  order: null,
};

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<OrderDetailsState['order']>) => {
      state.order = action.payload;
    },
  },
  selectors: {
    getOrder: (state) => state.order,
  },
});

export const { setOrder } = orderDetailsSlice.actions;
export const { getOrder } = orderDetailsSlice.selectors;
export default orderDetailsSlice.reducer;
