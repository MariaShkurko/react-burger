import { ROUTES } from '@/constants/ROUTES';
import { ingredientsCounters } from '@/services/burger-constructor/burger-constructor-slice';
import { useAppSelector } from '@/services/store';
import { Link, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const counters = useAppSelector(ingredientsCounters);

  return (
    <div ref={ref}>
      <h2 className="mb-6">{title}</h2>
      <ul className={`${styles.ingredient_list} mb-10 pl-4 pr-2`}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            <Link
              to={`${ROUTES.INGREDIENTS}/${ingredient._id}`}
              state={{ backgroundLocation: location }}
            >
              <IngredientItem ingredient={ingredient} count={counters[ingredient._id]} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
