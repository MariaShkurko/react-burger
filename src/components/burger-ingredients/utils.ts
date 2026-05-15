import type { TIngredient } from '@/utils/types';

type TFilteredIngredients = {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
};

export const getFilteredIngredients = (
  ingredients: TIngredient[]
): TFilteredIngredients => {
  const result: TFilteredIngredients = {
    buns: [],
    mains: [],
    sauces: [],
  };

  if (ingredients?.length) {
    ingredients.forEach((item) => {
      if (item.type === 'bun') {
        result.buns.push(item);
      } else if (item.type === 'main') {
        result.mains.push(item);
      } else if (item.type === 'sauce') {
        result.sauces.push(item);
      }
    });
  }

  return result;
};
