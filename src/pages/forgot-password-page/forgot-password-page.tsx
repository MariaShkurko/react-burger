import { ErrorBlock } from '@/components/error-block/error-block';
import { Page } from '@/components/page/page';
import { ROUTES } from '@/constants/ROUTES';
import { useResetPasswordMutation } from '@/services/api/auth-api';
import { getErrorMessage } from '@/utils/utils';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import styles from './forgot-password-page.module.css';

type TFormData = {
  email: string;
};

const initialFormData: TFormData = {
  email: '',
};

export const ForgotPasswordPage = (): React.JSX.Element | null => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TFormData>(initialFormData);
  const [error, setError] = useState('');

  const [resetPassword] = useResetPasswordMutation();

  const onChange = (id: keyof TFormData, value: string): void => {
    setFormData({ ...formData, [id]: value });
  };
  const onResetPassword = async (): Promise<void> => {
    await resetPassword(formData)
      .unwrap()
      .then((response) => {
        if (response.success) {
          void navigate(ROUTES.RESET_PASSWORD);
        } else {
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

  return (
    <Page>
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <h1 className="text text_type_main-large">Восстановление пароля</h1>
          <Input
            name="email"
            placeholder="Укажите e-mail"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            size="default"
            type="email"
          />

          {!!error && <ErrorBlock message={error} />}

          <Button onClick={onClick} size="medium" type="primary" htmlType="submit">
            Восстановить
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
