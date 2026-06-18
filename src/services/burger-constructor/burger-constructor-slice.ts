import {
  createSelector,
  createSlice,
  nanoid,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from '../types';
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
  selectors: {
    constructorIngredientsSelector: (state) => state.burgerConstructor,
  },
});

const selectApiIngredients = (state: RootState): TIngredient[] =>
  (state.api?.queries?.getIngredients?.data as TIngredient[]) ?? [];

export const ingredientsCounters = createSelector(
  selectApiIngredients,
  (state: RootState) => state.burgerConstructor.burgerConstructor,
  (allIngredients, selectedIngredients): Record<string, number> => {
    const ingredientsCounts: Record<string, number> = {};
    if (selectedIngredients?.bun) {
      ingredientsCounts[selectedIngredients.bun?._id] = 2;
    }
    if (selectedIngredients?.ingredients) {
      selectedIngredients.ingredients.forEach(({ _id }) => {
        if (ingredientsCounts[_id]) {
          ingredientsCounts[_id] += 1;
        } else {
          ingredientsCounts[_id] = 1;
        }
      });
    }
    allIngredients.forEach((item) => {
      if (!ingredientsCounts[item._id]) {
        ingredientsCounts[item._id] = 0;
      }
    });

    return ingredientsCounts;
  }
);

export const selectBurgerPrice = createSelector(
  (state: RootState) => state.burgerConstructor.burgerConstructor,
  (constructorData: TConstructorIngredients): number => {
    let bunPrice = 0;
    let ingredientsPrice = 0;

    if (constructorData.bun) {
      bunPrice = constructorData.bun.price * 2;
    }

    if (constructorData.ingredients?.length) {
      ingredientsPrice = constructorData.ingredients.reduce(
        (total, ingredient) => total + ingredient.price,
        0
      );
    }

    return bunPrice + ingredientsPrice;
  }
);

export const {
  setBun,
  addIngredient,
  deleteIngredient,
  moveIngredient,
  clearConstructor,
} = burgerConstructorSlice.actions;
export const { constructorIngredientsSelector } = burgerConstructorSlice.selectors;
export default burgerConstructorSlice.reducer;
