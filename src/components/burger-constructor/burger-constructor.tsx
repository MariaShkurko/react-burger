import { useCreateOrderMutation } from '@/api/burger-api';
import { useModal } from '@/hooks/useModal';
import {
  clearConstructor,
  type TConstructorIngredients,
} from '@/services/burger-constructor-slice';
import { setOrder } from '@/services/order-details-slice';
import { constructorIngredientsSelector, selectBurgerPrice } from '@/services/selectors';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { getErrorMessage } from '@/utils/utils';
import {
  Button,
  CurrencyIcon,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { BurgerConstructorIngredients } from '../burger-constructor-ingredients/burger-constructor-ingredients';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TConstructorIngredients;
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const burgerConstructor = useAppSelector(constructorIngredientsSelector);
  const totalPrice = useAppSelector(selectBurgerPrice);

  const { isModalOpen, openModal, closeModal } = useModal();

  const [error, setError] = useState('');

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const closeOrderModal = (): void => {
    closeModal();
    dispatch(clearConstructor());
  };

  const closeErrorModal = (): void => {
    setError('');
  };

  const onCreateOrder = (): void => {
    const create = async (): Promise<void> => {
      if (!burgerConstructor) return;
      const { bun, ingredients: burgerIngredients = [] } = burgerConstructor;
      await createOrder({
        ingredients: [
          bun?._id ?? '',
          ...burgerIngredients.map(({ _id }) => _id),
          bun?._id ?? '',
        ],
      })
        .unwrap()
        .then((response) => {
          dispatch(setOrder(response.order));
          openModal();
        })
        .catch((err: FetchBaseQueryError) => {
          setError(getErrorMessage(err) ?? 'Что-то пошло не так...');
        });
    };
    void create();
  };

  if (isLoading) return <Preloader />;

  return (
    <section className={`${styles.burger_constructor} pb-10`}>
      <BurgerConstructorIngredients burgerConstructor={ingredients} />
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

      {isModalOpen && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}

      {!!error && (
        <Modal title="Ошибка" onClose={closeErrorModal}>
          <p>{error}</p>
        </Modal>
      )}
    </section>
  );
};
