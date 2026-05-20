import {
  addIngredient,
  deleteIngredient,
  setBun,
  type TConstructorIngredients,
} from '@/services/burger-constructor-slice';
import { useAppDispatch } from '@/services/store';
import { DND_TYPES } from '@/utils/dndTypes';
import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrop } from 'react-dnd';

import { ConstructorIngredientItem } from '../constructor-ingredient-item/constructor-ingredient-item';

import type { TIngredient } from '@/utils/types';

import styles from './burger-constructor-ingredients.module.css';

type TBurgerConstructorProps = {
  burgerConstructor: TConstructorIngredients;
};

export const BurgerConstructorIngredients = ({
  burgerConstructor,
}: TBurgerConstructorProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const { bun, ingredients } = burgerConstructor;

  const [, drop] = useDrop({
    accept: [DND_TYPES.INGREDIENT, DND_TYPES.BUN],
    drop: (item: { ingredient: TIngredient }) => {
      const { ingredient } = item;
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const dropRef = (node: HTMLDivElement | null): void => {
    if (node !== null) {
      drop(node);
    }
    ref.current = node;
  };

  const onDeleteIngredient = (id: string): void => {
    dispatch(deleteIngredient(id));
  };

  return (
    <div ref={dropRef} className={`${styles.burger_constructor_ingredients} mb-10`}>
      {bun ? (
        <ConstructorElement
          key={`${bun._id}-up`}
          isLocked
          price={bun.price}
          text={`${bun.name} (верх)`}
          thumbnail={bun.image}
          type="top"
          extraClass="ml-8"
        />
      ) : (
        <ConstructorElement
          key="top-bun-place"
          price={0}
          text="Выберите булку"
          thumbnail="#"
          type="top"
          extraClass={`${styles.no_image_item} ml-8`}
        />
      )}

      <ul className={`${styles.list} mt-4 mb-4`}>
        {ingredients?.length ? (
          ingredients.map((item, index) => (
            <ConstructorIngredientItem
              key={item._localId}
              ingredient={item}
              index={index}
              onDelete={onDeleteIngredient}
            />
          ))
        ) : (
          <li key="ingredients-place">
            <ConstructorElement
              key="ingredients-place"
              price={0}
              text="Выберите начинку"
              thumbnail="#"
              extraClass={`${styles.no_image_item} ml-8`}
            />
          </li>
        )}
      </ul>

      {bun ? (
        <ConstructorElement
          key={`${bun._id}-bottom`}
          isLocked
          price={bun.price}
          text={`${bun.name} (низ)`}
          thumbnail={bun.image}
          type="bottom"
          extraClass="ml-8"
        />
      ) : (
        <ConstructorElement
          key="bottom-bun-place"
          price={0}
          text="Выберите булку"
          thumbnail="#"
          type="bottom"
          extraClass={`${styles.no_image_item} ml-8`}
        />
      )}
    </div>
  );
};
