import { ErrorBlock } from '@/components/error-block/error-block';
import { Page } from '@/components/page/page';
import { ROUTES } from '@/constants/ROUTES';
import { useLoginMutation } from '@/services/api/auth-api';
import { getErrorMessage } from '@/utils/utils';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useLocation, useNavigate, type Location } from 'react-router-dom';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import styles from './login-page.module.css';

type TFormData = {
  email: string;
  password: string;
};

const initialFormData: TFormData = {
  email: '',
  password: '',
};

export const LoginPage = (): React.JSX.Element | null => {
  const navigate = useNavigate();
  const { state } = useLocation() as Location<{ from: Location<unknown> }>;

  const [formData, setFormData] = useState<TFormData>(initialFormData);
  const [error, setError] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [login] = useLoginMutation();

  const onChange = (id: keyof TFormData, value: string): void => {
    setFormData({ ...formData, [id]: value });
  };
  const onToggleShowPassword = (): void => {
    setIsShowPassword((prev) => !prev);
  };
  const onLogin = async (): Promise<void> => {
    await login(formData)
      .unwrap()
      .then(() => {
        void navigate(state?.from?.pathname || ROUTES.HOME, {
          state: state?.from?.state ?? state,
        });
      })
      .catch((err: FetchBaseQueryError) => {
        setError(getErrorMessage(err) ?? 'Что-то пошло не так...');
      });
  };
  const onClick = (e: React.SyntheticEvent<Element, Event>): void => {
    e.preventDefault();
    void onLogin();
  };

  return (
    <Page>
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <h1 className="text text_type_main-large">Вход</h1>
          <Input
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            size="default"
            type="email"
          />
          <Input
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={(e) => onChange('password', e.target.value)}
            size="default"
            type={isShowPassword ? 'text' : 'password'}
            icon={isShowPassword ? 'HideIcon' : 'ShowIcon'}
            onIconClick={onToggleShowPassword}
          />

          {!!error && <ErrorBlock message={error} />}

          <Button onClick={onClick} size="medium" type="primary" htmlType="submit">
            Войти
          </Button>
        </form>
        <p className="text text_type_main-small">
          Вы - новый пользователь?{' '}
          <Link to={ROUTES.REGISTER} className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-small">
          Забыли пароль?{' '}
          <Link to={ROUTES.FORGOT_PASSWORD} className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </Page>
  );
};
