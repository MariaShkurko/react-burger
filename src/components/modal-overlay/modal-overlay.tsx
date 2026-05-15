import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLDivElement>;
};

export const ModalOverlay = ({
  isOpen,
  onClose,
}: TModalOverlayProps): React.JSX.Element | null => {
  if (!isOpen) return null;

  return <div className={styles.modal_overlay} onClick={onClose} />;
};
