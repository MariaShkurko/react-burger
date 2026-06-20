import { useGetUserQuery, useUpdateUserMutation } from '@/services/api/auth-api';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import styles from './profile.module.css';

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

export const Profile = (): React.JSX.Element | null => {
  const [formData, setFormData] = useState<TFormData>(initialFormData);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const { data: user } = useGetUserQuery();
  useEffect(() => {
    if (user) {
      setFormData({ password: '', ...user });
    }
  }, [user]);

  const [updateUser] = useUpdateUserMutation();

  const isShowButtons =
    user?.email !== formData.email || user?.name !== formData.name || formData.password;

  const onChange = (id: keyof TFormData, value: string): void => {
    setFormData({ ...formData, [id]: value });
  };
  const onToggleShowPassword = (): void => {
    setIsShowPassword((prev) => !prev);
  };
  const onCancel = (e: React.SyntheticEvent<Element, Event>): void => {
    e.preventDefault();
    setFormData({
      password: '',
      email: user?.email ?? '',
      name: user?.name ?? '',
    });
  };
  const onUpdate = async (): Promise<void> => {
    await updateUser(formData)
      .unwrap()
      .then((response) => {
        setFormData({ ...response, password: '' });
      })
      .catch((err) => console.log(err));
  };
  const onSubmit = (e: React.SyntheticEvent<Element, Event>): void => {
    e.preventDefault();
    void onUpdate();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
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
        placeholder="Логин"
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
      {isShowButtons && (
        <div className={styles.button_group}>
          <Button onClick={onCancel} size="medium" type="secondary" htmlType="submit">
            Отмена
          </Button>
          <Button size="medium" type="primary" htmlType="submit">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
