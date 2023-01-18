import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import { X } from 'tabler-icons-react';
import Button from '../button/button';
import Card from '../card/card';
import styles from './modal.module.scss';

import type { CardProps } from '../card/card';

interface ModalProps {
  trigger: ReactNode;
  children: ReactNode;
}

// merge ModalPros with CardProps
type ModalAndCardProps = ModalProps & CardProps;

const Modal = ({
  title,
  headerRight,
  icon,
  trigger,
  children,
}: ModalAndCardProps) => {
  //const modalClasses = classNames([styles.modal]);
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.modalOverlay} />
        <Dialog.Content className={styles.modalContent}>
          <Card
            title={title}
            icon={icon}
            headerRight={
              <>
                {headerRight}
                <Dialog.Close asChild>
                  <Button color="white" className={styles.close}>
                    <X />
                  </Button>
                </Dialog.Close>
              </>
            }
          >
            {children}
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
