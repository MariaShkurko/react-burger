import { setSelectedIngredient } from '@/services/ingredient-details/ingredient-details-slice';
import { useAppDispatch } from '@/services/store';
import { DND_TYPES } from '@/utils/dndTypes';
import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag } from 'react-dnd';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-item.module.css';

type TIngredientItemProps = {
  ingredient: TIngredient;
  count: number;
};

export const IngredientItem = ({
  ingredient,
  count,
}: TIngredientItemProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const onClick = (): void => {
    dispatch(setSelectedIngredient(ingredient));
  };

  const [{ isDragging }, drag] = useDrag({
    type: ingredient.type === 'bun' ? DND_TYPES.BUN : DND_TYPES.INGREDIENT,
    item: { ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const dragRef = (node: HTMLDivElement | null): void => {
    if (node !== null) {
      drag(node);
    }
    ref.current = node;
  };

  return (
    <div
      ref={dragRef}
      className={`${styles.ingredient_item} ${isDragging ? styles.dragging : ''}`}
      onClick={onClick}
    >
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
