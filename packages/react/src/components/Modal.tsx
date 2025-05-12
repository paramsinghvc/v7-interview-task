import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import styles from '@v7-product-interview-task/styles/Modal.module.css';

// Define the props for the Modal component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];

  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelectors.join(','))
  ).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
  );
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus on the first element inside the modal when it opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const [firstFocusableElement] = getFocusableElements(modalRef.current);
      firstFocusableElement?.focus();
    }
  }, [isOpen]);

  // Trap focus within the modal
  const handleFocusTrap = (event: React.KeyboardEvent) => {
    const focusableElements = modalRef.current?.querySelectorAll(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    console.log({ firstElement, lastElement });
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  };

  // Close the modal when the Escape key is pressed
  const handleKeyDown = (event: React.KeyboardEvent) => {
    handleFocusTrap(event);
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles['modalOverlay']}
          onClick={onClose}
          role="presentation"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={styles['modalContainer']}
            ref={modalRef}
            role="dialog"
            aria-labelledby="modalTitle"
            aria-describedby="modalDescription"
            onKeyDown={handleKeyDown}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles['modalContent']}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
