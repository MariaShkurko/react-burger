import { ingredientsCounters } from '@/services/burger-constructor/burger-constructor-slice';
import { useAppSelector } from '@/services/store';

import { IngredientItem } from '../ingredient-item/ingredient-item';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-list.module.css';

type TIngredientItemProps = {
  title: string;
  ingredients: TIngredient[];
} & React.RefAttributes<HTMLDivElement>;

export const IngredientList = ({
  title,
  ingredients,
  ref,
}: TIngredientItemProps): React.JSX.Element => {
  const counters = useAppSelector(ingredientsCounters);

  return (
    <div ref={ref}>
      <h2 className="mb-6">{title}</h2>
      <ul className={`${styles.ingredient_list} mb-10 pl-4 pr-2`}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            <IngredientItem ingredient={ingredient} count={counters[ingredient._id]} />
          </li>
        ))}
      </ul>
    </div>
  );
};
