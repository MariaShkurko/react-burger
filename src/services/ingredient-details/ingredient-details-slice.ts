import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

type IngredientDetailsState = {
  selected: TIngredient | null;
};

const initialState: IngredientDetailsState = {
  selected: null,
};

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setSelectedIngredient: (
      state,
      action: PayloadAction<IngredientDetailsState['selected']>
    ) => {
      state.selected = action.payload;
    },
  },
  selectors: {
    selectedIngredientSelector: (state) => state.selected,
  },
});

export const { setSelectedIngredient } = ingredientDetailsSlice.actions;
export const { selectedIngredientSelector } = ingredientDetailsSlice.selectors;
export default ingredientDetailsSlice.reducer;
