import { Page } from '@/components/page/page';
import { ROUTES } from '@/constants/ROUTES';
import { Link } from 'react-router-dom';

import styles from './not-found-page.module.css';

export const NotFoundPage = (): React.JSX.Element | null => {
  return (
    <Page>
      <div className={styles.wrapper}>
        <p className="text text_type_main-large">Страница не найдена</p>
        <Link to={ROUTES.HOME} className={`text text_type_main-medium ${styles.link}`}>
          На главную
        </Link>
      </div>
    </Page>
  );
};
