import { IModalContext } from '../../types/types';
import './Modal.css';
import React from 'react';

const Modal = (props: IModalContext) => {
    const modalRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (props.isModalOpen) {
            document.body.classList.add('body_active');
            document.body.classList.add('body_overlay');
            modalRef.current?.classList.add('modal_active');
        } else {
            document.body.classList.remove('body_active');
            document.body.classList.remove('body_overlay');
            modalRef.current?.classList.remove('modal_active');
        }
    }, [props.isModalOpen]);

    return (
        <div className="modal" ref={modalRef}>
            <img
                className="modal__close-button"
                src="assets/icons/close-button.svg"
                alt="close"
                onClick={() => props.setModalStatus(false)}
            />
            <p className="modal__message">MAXIMUM 20 ITEMS</p>
        </div>
    );
};

export default Modal;
