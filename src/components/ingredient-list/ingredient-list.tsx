import { IngredientItem } from '../ingredient-item/ingredient-item';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-list.module.css';

type TIngredientItemProps = {
  title: string;
  ingredients: TIngredient[];
  selectedIngredientIds: string[];
  onSelectIngredient: (ingredient: TIngredient) => void;
} & React.RefAttributes<HTMLDivElement>;

export const IngredientList = ({
  title,
  ingredients,
  selectedIngredientIds,
  onSelectIngredient,
  ref,
}: TIngredientItemProps): React.JSX.Element => {
  const onClick = (ingredient: TIngredient): void => {
    if (onSelectIngredient) onSelectIngredient(ingredient);
  };

  return (
    <div ref={ref}>
      <h2 className="mb-6">{title}</h2>
      <ul className={`${styles.ingredient_list} mb-10 pl-4 pr-2`}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            <IngredientItem
              ingredient={ingredient}
              count={selectedIngredientIds.includes(ingredient._id) ? 1 : 0}
              onClick={() => onClick(ingredient)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
