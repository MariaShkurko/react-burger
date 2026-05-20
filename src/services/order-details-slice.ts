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
});

export const { setOrder } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
