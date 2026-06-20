import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';
import { Page } from '@/components/page/page';
import { useGetIngredientsQuery } from '@/services/api/burger-api';
import { useParams } from 'react-router-dom';

import styles from './ingredient.module.css';

export const Ingredient = (): React.JSX.Element | null => {
  const { id } = useParams();

  const { data: ingredients = [] } = useGetIngredientsQuery();
  const ingredient = ingredients?.find((value) => value._id === id);

  if (!ingredient) return null;

  return (
    <Page>
      <h1 className={`${styles.title} text text_type_main-large mt-15 mb-5`}>
        Детали ингредиента
      </h1>
      <IngredientDetails ingredient={ingredient} />
    </Page>
  );
};
