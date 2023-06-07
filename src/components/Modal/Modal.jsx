import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer } from './Modal.styled';
import PropTypes from 'prop-types';

const rootModal = document.querySelector('#root-modal');

export default function Modal({ image, onClose, tags }) {
  useEffect(() => {
    const handleEscape = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdrop}>
      <ModalContainer>
        <img src={image} alt={tags} />
      </ModalContainer>
    </Overlay>,
    rootModal
  );
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  tags: PropTypes.string,
};
