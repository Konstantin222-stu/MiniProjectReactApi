import React, { useEffect, useRef } from 'react';
import type { ModalProps } from '../../types/modal.type';

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event:MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;