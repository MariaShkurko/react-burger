import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';
// import DoneSvg from '../../assets/images/graphics.svg?raw';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element | null => {
  return (
    <div className={styles.order_details}>
      <p className="text text_type_digits-large mb-8">034536</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className="mb-15">
        <CheckMarkIcon type="primary" className={styles.order_done} />
        {/* <DoneSvg /> */}
      </div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
