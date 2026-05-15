import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-item.module.css';

type TIngredientItemProps = {
  ingredient: TIngredient;
  count: number;
  onClick: () => void;
};

export const IngredientItem = ({
  ingredient,
  count,
  onClick,
}: TIngredientItemProps): React.JSX.Element => {
  return (
    <div className={styles.ingredient_item} onClick={onClick}>
      {count > 0 && <Counter count={count} size="default" />}
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={`${styles.ingredient_image} pl-4 pr-4`}
      />
      <div className={`${styles.ingredient_price} m-1 text text_type_digits-default`}>
        <span>{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div>{ingredient.name}</div>
    </div>
  );
};
