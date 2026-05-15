import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { BurgerConstructorIngredients } from '../burger-constructor-ingredients/burger-constructor-ingredients';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
  selectedIngredientIds: string[];
  onDeleteIngredient: (id: string) => void;
};

export const BurgerConstructor = ({
  ingredients,
  selectedIngredientIds,
  onDeleteIngredient,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const selectedIngredient = ingredients.filter(({ _id }) =>
    selectedIngredientIds.includes(_id)
  );
  const totalPrice = selectedIngredient
    ? selectedIngredient.reduce((sum, item) => (sum += item.price), 0)
    : 0;

  const onCreateOrder = (): void => {
    setIsOpenModal(true);
  };

  const onCloseModal = (): void => {
    setIsOpenModal(false);
  };

  return (
    <section className={`${styles.burger_constructor} pb-10`}>
      <BurgerConstructorIngredients
        ingredients={selectedIngredient}
        onDelete={onDeleteIngredient}
      />
      <div className={styles.total_block}>
        <div className={`${styles.total} mr-10 text text_type_digits-medium`}>
          <span>{totalPrice}</span>
          <CurrencyIcon type="primary" className={styles.total_icon} />
        </div>
        <Button
          onClick={onCreateOrder}
          size="large"
          htmlType="button"
          disabled={totalPrice === 0}
        >
          Оформить заказ
        </Button>
      </div>

      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <OrderDetails />
      </Modal>
    </section>
  );
};
