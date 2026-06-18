import { getOrder } from '@/services/order/order-details-slice';
import { useAppSelector } from '@/services/store';

import DoneSvg from '../../assets/images/graphics.svg';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element | null => {
  const order = useAppSelector(getOrder);

  return (
    <div className={styles.order_details}>
      <p className="text text_type_digits-large mb-8">{order?.number}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className="mb-15">
        <img src={DoneSvg} alt="done" className={styles.order_done} />
      </div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
