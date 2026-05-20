import { createSelector } from '@reduxjs/toolkit';

import type { TConstructorIngredients } from './burger-constructor-slice';
import type { RootState } from './store';
import type { TIngredient } from '@/utils/types';

export const selectedIngredientSelector = (state: RootState): TIngredient | null =>
  state.ingredientDetails.selected;

export const constructorIngredientsSelector = (
  state: RootState
): TConstructorIngredients => state.burgerConstructor.burgerConstructor;

export const getOrder = (
  state: RootState
): {
  number: number;
} | null => state.orderDetails.order;

const selectApiIngredients = (state: RootState): TIngredient[] =>
  (state.api?.queries?.getIngredients?.data as TIngredient[]) ?? [];

export const ingredientsCounters = createSelector(
  selectApiIngredients,
  constructorIngredientsSelector,
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
  constructorIngredientsSelector,
  (constructorData: TConstructorIngredients): number => {
    let bunPrice = 0;
    let ingredientsPrice = 0;

    // Расчёт стоимости булки (всегда 2 экземпляра)
    if (constructorData.bun) {
      bunPrice = constructorData.bun.price * 2;
    }

    // Расчёт стоимости остальных ингредиентов
    if (constructorData.ingredients?.length) {
      ingredientsPrice = constructorData.ingredients.reduce(
        (total, ingredient) => total + ingredient.price,
        0
      );
    }

    return bunPrice + ingredientsPrice;
  }
);
