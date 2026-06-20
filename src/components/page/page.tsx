import { AppHeader } from '../app-header/app-header';

import styles from './page.module.css';

export const Page = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return (
    <div className={styles.page}>
      <AppHeader />
      {children}
    </div>
  );
};
