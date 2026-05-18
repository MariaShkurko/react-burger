import styles from './error-block.module.css';

type TErrorBlockProps = {
  message: string;
};

export const ErrorBlock = ({ message }: TErrorBlockProps): React.JSX.Element => {
  return (
    <div className={styles.error_block}>
      <h2 className="text text_type_main-large">Ошибка</h2>
      <p className="text text_type_main-default">{message}</p>
    </div>
  );
};
