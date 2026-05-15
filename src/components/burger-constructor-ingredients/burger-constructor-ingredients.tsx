import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor-ingredients.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
  onDelete: (id: string) => void;
};

export const BurgerConstructorIngredients = ({
  ingredients,
  onDelete,
}: TBurgerConstructorProps): React.JSX.Element => {
  const bun = ingredients.find((item) => item.type === 'bun');
  const filteredIngredients = ingredients.filter((item) => item.type !== 'bun');

  const handleClose = (id: string): void => {
    if (onDelete) onDelete(id);
  };

  return (
    <div className={`${styles.burger_constructor_ingredients} mb-10`}>
      {!!bun && (
        <ConstructorElement
          key={`${bun._id}-up`}
          handleClose={() => handleClose(bun._id)}
          isLocked
          price={bun.price}
          text={`${bun.name} (верх)`}
          thumbnail={bun.image}
          type="top"
        />
      )}
      {bun && (
        <ul className={`${styles.list} mt-4 mb-4`}>
          {filteredIngredients.map((item) => (
            <li key={item._id}>
              <ConstructorElement
                handleClose={() => handleClose(item._id)}
                price={item.price}
                text={item.name}
                thumbnail={item.image}
              />
            </li>
          ))}
        </ul>
      )}
      {!!bun && (
        <ConstructorElement
          key={`${bun._id}-down`}
          handleClose={() => handleClose(bun._id)}
          isLocked
          price={bun.price}
          text={`${bun.name} (низ)`}
          thumbnail={bun.image}
          type="bottom"
        />
      )}
    </div>
  );
};
