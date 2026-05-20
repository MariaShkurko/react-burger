import { moveIngredient } from '@/services/burger-constructor/burger-constructor-slice';
import { useAppDispatch } from '@/services/store';
import { DND_TYPES } from '@/utils/dndTypes';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import type { TExtendIngredient } from '@/utils/types';

import styles from './constructor-ingredient-item.module.css';

type TConstructorIngredientItemProps = {
  ingredient: TExtendIngredient;
  index: number;
  onDelete: (id: string) => void;
};

export const ConstructorIngredientItem = ({
  ingredient,
  index,
  onDelete,
}: TConstructorIngredientItemProps): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: DND_TYPES.INGREDIENT_INTERNAL,
    item: { ingredient, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: DND_TYPES.INGREDIENT_INTERNAL,
    hover: (draggedItem: { ingredient: TExtendIngredient; index: number }, monitor) => {
      const hoverIndex = index;
      const dragIndex = draggedItem.index;

      if (dragIndex === hoverIndex) return;

      const element = ref.current;
      if (!element) return;

      const hoverBoundingRect = element.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(moveIngredient({ fromIndex: dragIndex, toIndex: hoverIndex }));
      draggedItem.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={`${styles.ingredient_item} ${isDragging ? styles.dragging : ''}`}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        handleClose={() => onDelete(ingredient._localId)}
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
      />
    </li>
  );
};
