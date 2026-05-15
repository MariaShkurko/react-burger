import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

type TModalProps = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
  isOpen: boolean;
};

export const Modal = ({
  title,
  onClose,
  children,
  isOpen,
}: TModalProps): React.JSX.Element | null => {
  const modalRoot = document.getElementById('modal');

  const handleClose = (): void => {
    onClose();
  };

  // Обработка нажатия Esc
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return (): void => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <>
      <ModalOverlay isOpen={isOpen} onClose={handleOverlayClick} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <CloseIcon type="primary" onClick={handleClose} />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};
