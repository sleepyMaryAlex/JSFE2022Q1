import { IModal } from '../../types/types';
import './Modal.css';
import closeButton from '../../assets/close-button.svg';

function Modal(props: IModal) {
  return (
    <div className={`modal${props.isModalOpen ? '' : ' invisible'}`}>
      <img
        className="modal__close-button"
        src={closeButton}
        alt="close"
        onClick={() => props.setIsModalOpen(false)}
      />
      <div className="modal__message">
        <p>THE WINNER IS</p>
        <p>{props.winner?.car.name || ''}</p>
        <p>
          (
          {props.winner?.time || ''}
          {' '}
          SEC)!
        </p>
      </div>
    </div>
  );
}

export default Modal;
