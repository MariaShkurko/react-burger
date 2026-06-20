import { ErrorBlock } from '@/components/error-block/error-block';
import { Page } from '@/components/page/page';
import { ROUTES } from '@/constants/ROUTES';
import { useRegisterMutation } from '@/services/api/auth-api';
import { getErrorMessage } from '@/utils/utils';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useLocation, useNavigate, type Location } from 'react-router-dom';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import styles from './register-page.module.css';

type TFormData = {
  email: string;
  password: string;
  name: string;
};

const initialFormData: TFormData = {
  email: '',
  password: '',
  name: '',
};

export const RegisterPage = (): React.JSX.Element | null => {
  const navigate = useNavigate();
  const { state } = useLocation() as Location<{ from: Location<unknown> }>;

  const [formData, setFormData] = useState<TFormData>(initialFormData);
  const [error, setError] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [register] = useRegisterMutation();

  const onChange = (id: keyof TFormData, value: string): void => {
    setFormData({ ...formData, [id]: value });
  };
  const onToggleShowPassword = (): void => {
    setIsShowPassword((prev) => !prev);
  };
  const onRegister = async (): Promise<void> => {
    await register(formData)
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
    void onRegister();
  };

  return (
    <Page>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={onClick}>
          <h1 className="text text_type_main-large">Регистрация</h1>
          <Input
            name="name"
            placeholder="Имя"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            size="default"
            type="text"
          />
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

          <Button size="medium" type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-small">
          Уже зарегистрированы?{' '}
          <Link to={ROUTES.LOGIN} className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </Page>
  );
};
