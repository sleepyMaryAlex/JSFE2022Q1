import { useContext, useEffect, useRef } from 'react';
import { RaceStatusContext, SelectedCarContext } from '../../App';
import Common from '../../app/common';
import { ICreateCar, IUpdateCar } from '../../types/types';
import './Forms.css';

function Forms(props: { createCar: (car: ICreateCar) => void,
  updateCar: (car: IUpdateCar) => void }) {
  const createNameInputRef = useRef<HTMLInputElement>(null);
  const createColorInputRef = useRef<HTMLInputElement>(null);
  const updateNameInputRef = useRef<HTMLInputElement>(null);
  const updateColorInputRef = useRef<HTMLInputElement>(null);

  const selectedCar = useContext(SelectedCarContext);
  const { isRace } = useContext(RaceStatusContext);

  useEffect(() => {
    const updateNameInput = updateNameInputRef.current as HTMLInputElement;
    updateNameInput.value = selectedCar?.name || '';
    const updateColorInput = updateColorInputRef.current as HTMLInputElement;
    updateColorInput.value = selectedCar?.color || '#ffe800';
  }, [selectedCar]);

  const createCar = () => {
    const createNameInput = createNameInputRef.current as HTMLInputElement;
    const createColorInput = createColorInputRef.current as HTMLInputElement;
    const name = createNameInput.value || 'YOUR CAR';
    createNameInput.value = '';
    const color = createColorInput.value;
    const url = Common.getRandomUrl();
    props.createCar({ name, color, url });
  };

  const updateCar = () => {
    if (selectedCar) {
      const updateNameInput = updateNameInputRef.current as HTMLInputElement;
      const updateColorInput = updateColorInputRef.current as HTMLInputElement;
      const name = updateNameInput.value || selectedCar.name;
      updateNameInput.value = '';
      const color = updateColorInput.value;
      const { id } = selectedCar;
      props.updateCar({
        id, name, color, url: selectedCar.url,
      });
    }
  };

  const disabled = selectedCar === null;

  return (
    <div className="forms">
      <div className="form">
        <input
          type="text"
          className="form__create-name input-text"
          placeholder="ENTER CAR MODEL"
          ref={createNameInputRef}
          disabled={isRace}
        />
        <input
          type="color"
          className={`form__create-color input-color${isRace ? ' disabled' : ''}`}
          disabled={isRace}
          defaultValue="#ffe800"
          ref={createColorInputRef}
        />
        <button
          type="button"
          className={`form__create-button button${isRace ? ' disabled' : ''}`}
          onClick={createCar}
          disabled={isRace}
        >
          CREATE
        </button>
      </div>
      <div className="form">
        <input
          type="text"
          className="form__update-name input-text"
          disabled={disabled || isRace}
          placeholder="ENTER CAR MODEL"
          ref={updateNameInputRef}
        />
        <input
          type="color"
          className={`form__update-color input-color${disabled || isRace ? ' disabled' : ''}`}
          disabled={disabled || isRace}
          defaultValue="#ffe800"
          ref={updateColorInputRef}
        />
        <button
          type="button"
          className={`form__update-button button ${disabled || isRace ? ' disabled' : ''}`}
          disabled={disabled || isRace}
          onClick={() => updateCar()}
        >
          UPDATE
        </button>
      </div>
    </div>
  );
}

export default Forms;
