import { Page } from '@/components/page/page';
import { ROUTES } from '@/constants/ROUTES';
import { useLogoutMutation } from '@/services/api/auth-api';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import styles from './profile-page.module.css';

export const ProfilePage = (): React.JSX.Element | null => {
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const onLogout = async (): Promise<void> => {
    await logout()
      .unwrap()
      .then(() => {
        void navigate(ROUTES.HOME);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Page>
      <div className={styles.wrapper}>
        <nav className={styles.navigation}>
          <ul className={styles.nav_list}>
            <li>
              <NavLink
                to={ROUTES.PROFILE}
                className={({ isActive }) =>
                  `text text_type_main-medium ${styles.link}${isActive ? ` ${styles.active_link}` : ''}`
                }
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${ROUTES.PROFILE}/${ROUTES.ORDERS}`}
                className={({ isActive }) =>
                  `text text_type_main-medium ${styles.link}${isActive ? ` ${styles.active_link}` : ''}`
                }
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <div
                onClick={() => void onLogout()}
                className={`text text_type_main-medium ${styles.link}`}
              >
                Выход
              </div>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </Page>
  );
};
