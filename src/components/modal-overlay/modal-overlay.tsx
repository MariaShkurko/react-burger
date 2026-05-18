import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClose: React.MouseEventHandler<HTMLDivElement>;
};

export const ModalOverlay = ({
  onClose,
}: TModalOverlayProps): React.JSX.Element | null => {
  return <div className={styles.modal_overlay} onClick={onClose} />;
};
