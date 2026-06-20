import { ErrorBlock } from '@/components/error-block/error-block';
import { Page } from '@/components/page/page';
import { ROUTES } from '@/constants/ROUTES';
import { useSetPasswordMutation } from '@/services/api/auth-api';
import { getErrorMessage } from '@/utils/utils';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import styles from './reset-password-page.module.css';

type TFormData = {
  password: string;
  token: string;
};

const initialFormData: TFormData = {
  password: '',
  token: '',
};

export const ResetPasswordPage = (): React.JSX.Element | null => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TFormData>(initialFormData);
  const [error, setError] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [resetPassword] = useSetPasswordMutation();

  const onChange = (id: keyof TFormData, value: string): void => {
    setFormData({ ...formData, [id]: value });
  };
  const onToggleShowPassword = (): void => {
    setIsShowPassword((prev) => !prev);
  };
  const onResetPassword = async (): Promise<void> => {
    await resetPassword(formData)
      .unwrap()
      .then((response) => {
        if (response.success) {
          void navigate(ROUTES.LOGIN);
        } else {
          localStorage.removeItem('isGetCode');
          setError(response.message);
        }
      })
      .catch((err: FetchBaseQueryError) => {
        localStorage.removeItem('isGetCode');
        setError(getErrorMessage(err) ?? 'Что-то пошло не так...');
      });
  };
  const onClick = (e: React.SyntheticEvent<Element, Event>): void => {
    e.preventDefault();
    void onResetPassword();
  };

  useEffect(() => {
    const isGetCode = localStorage.getItem('isGetCode');

    if (!isGetCode || isGetCode !== 'true') {
      void navigate(ROUTES.FORGOT_PASSWORD);
    }
  }, []);

  return (
    <Page>
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <h1 className="text text_type_main-large">Восстановление пароля</h1>
          <Input
            name="password"
            placeholder="Введите новый пароль"
            value={formData.password}
            onChange={(e) => onChange('password', e.target.value)}
            size="default"
            type={isShowPassword ? 'text' : 'password'}
            icon={isShowPassword ? 'HideIcon' : 'ShowIcon'}
            onIconClick={onToggleShowPassword}
          />
          <Input
            name="token"
            placeholder="Введите код из письма"
            value={formData.token}
            onChange={(e) => onChange('token', e.target.value)}
            size="default"
            type="text"
          />

          {!!error && <ErrorBlock message={error} />}

          <Button onClick={onClick} size="medium" type="primary" htmlType="submit">
            Сохранить
          </Button>
        </form>
        <p className="text text_type_main-small">
          Вспомнили пароль?{' '}
          <Link to={ROUTES.LOGIN} className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </Page>
  );
};
