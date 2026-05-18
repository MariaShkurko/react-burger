import type { TIngredient } from '@/utils/types';

import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
  ingredient: TIngredient | null;
};

export const IngredientDetails = ({
  ingredient,
}: TIngredientDetailsProps): React.JSX.Element | null => {
  if (!ingredient) return null;

  return (
    <div className={styles.ingredient_details}>
      <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
      <div className={styles.nutrients_block}>
        <div className={styles.nutrient}>
          <span className="text text_type_main-small">Калории,ккал</span>
          <span className="text text_type_digits-default">{ingredient.calories}</span>
        </div>
        <div className={styles.nutrient}>
          <span className="text text_type_main-small">Белки, г</span>
          <span className="text text_type_digits-default">{ingredient.proteins}</span>
        </div>
        <div className={styles.nutrient}>
          <span className="text text_type_main-small">Жиры, г</span>
          <span className="text text_type_digits-default">{ingredient.fat}</span>
        </div>
        <div className={styles.nutrient}>
          <span className="text text_type_main-small">Углеводы, г</span>
          <span className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};
