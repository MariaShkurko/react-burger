import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import type { TExtendIngredient, TIngredient } from '@/utils/types';

export type TConstructorIngredients = {
  bun: TIngredient | null;
  ingredients: TExtendIngredient[];
};
type BurgerConstructorState = {
  burgerConstructor: TConstructorIngredients;
};

const initialState: BurgerConstructorState = {
  burgerConstructor: {
    bun: null,
    ingredients: [],
  },
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: (
      state,
      action: PayloadAction<BurgerConstructorState['burgerConstructor']['bun']>
    ) => {
      state.burgerConstructor.bun = action.payload;
    },
    addIngredient: {
      reducer(state, action: PayloadAction<TExtendIngredient>) {
        state.burgerConstructor.ingredients.push(action.payload);
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, _localId: nanoid() } };
      },
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.burgerConstructor.ingredients = state.burgerConstructor.ingredients.filter(
        ({ _localId }) => _localId !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;

      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= state.burgerConstructor.ingredients.length ||
        toIndex >= state.burgerConstructor.ingredients.length
      )
        return;

      const ingredient = state.burgerConstructor.ingredients[fromIndex];
      state.burgerConstructor.ingredients.splice(fromIndex, 1);
      state.burgerConstructor.ingredients.splice(toIndex, 0, ingredient);
    },
    clearConstructor: (state) => {
      state.burgerConstructor = initialState.burgerConstructor;
    },
  },
});

export const {
  setBun,
  addIngredient,
  deleteIngredient,
  moveIngredient,
  clearConstructor,
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
