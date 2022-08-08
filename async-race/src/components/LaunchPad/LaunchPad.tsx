import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { ILaunchPad } from '../../types/types';
import Car from '../Car/Car';
import './LaunchPad.css';
import flagImage from '../../assets/flag.svg';
import { RaceStatusContext, SelectedCarContext } from '../../App';

function LaunchPad(props: ILaunchPad) {
  const selectedCar = useContext(SelectedCarContext);
  const { isRace, isReset } = useContext(RaceStatusContext);

  const [animationStatus, setAnimationStatus] = useState({ isActive: false, position: 0 });

  const requestRef = useRef(null as number | null);
  const timestampRef = useRef(null as number | null);
  const elapsedRef = useRef(0);
  const isCanceledRef = useRef(false);

  const animate = () => {
    const estimated = 500000 / props.velocity;
    const distance = document.documentElement.clientWidth - 150;
    const velocity = distance / estimated;

    const step = (timestamp: number) => {
      if (timestampRef.current) {
        const elapsed = timestamp - timestampRef.current;
        timestampRef.current = timestamp;
        elapsedRef.current += elapsed;
        const passed = elapsed * velocity;
        setAnimationStatus((prev) => ({
          isActive: true, position: Math.min(prev.position + passed, distance),
        }));

        if (!isCanceledRef.current) {
          requestRef.current = requestAnimationFrame(step);
        }
      } else {
        timestampRef.current = timestamp;
        requestRef.current = requestAnimationFrame(step);
      }
    };

    requestRef.current = null;
    timestampRef.current = null;
    requestRef.current = requestAnimationFrame(step);
  };

  const startAnimation = () => {
    elapsedRef.current = 0;
    isCanceledRef.current = false;
    setAnimationStatus({ isActive: true, position: 0 });
    animate();
  };

  const stopAnimation = () => {
    if (requestRef.current) {
      window.cancelAnimationFrame(requestRef.current);
    }
    elapsedRef.current = 0;
    isCanceledRef.current = true;
  };

  const resetAnimation = () => {
    if (requestRef.current) {
      window.cancelAnimationFrame(requestRef.current);
    }
    elapsedRef.current = 0;
    isCanceledRef.current = true;
    setAnimationStatus({ isActive: false, position: 0 });
  };

  useEffect(() => {
    if (props.velocity > 0) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [props.velocity]);

  useEffect(() => {
    if (isReset) {
      resetAnimation();
    }
  }, [isReset]);

  const selectCar = () => {
    if (props.car.id === selectedCar?.id) {
      props.selectCar(null);
    } else {
      props.selectCar(props.car);
    }
  };

  const removeCar = () => {
    if (props.car.id === selectedCar?.id) {
      props.selectCar(null);
    }
    props.removeCar(props.car.id);
  };

  const startTestDrive = async () => {
    props.startTestDrive(props.car.id);
  };

  const stopTestDrive = async () => {
    await props.stopTestDrive(props.car.id);
    resetAnimation();
  };

  return (
    <div className="launch-pad">
      <div className="car-controls">
        <button
          className={`car-controls__select-button button${props.car.id === selectedCar?.id ? ' button-active' : ''} ${isRace ? ' disabled' : ''}`}
          type="button"
          onClick={() => selectCar()}
          disabled={isRace}
        >
          SELECT
        </button>
        <button
          className={`car-controls__remove-button button${isRace ? ' disabled' : ''}`}
          type="button"
          disabled={isRace}
          onClick={() => removeCar()}
        >
          REMOVE
        </button>
        <div className="control-buttons">
          <button
            className={`car-controls__start-button control button${isRace || animationStatus.isActive ? ' disabled' : ''}`}
            type="button"
            onClick={() => startTestDrive()}
            disabled={isRace || animationStatus.isActive}
          >
            ▶
          </button>
          <button
            className={`car-controls__stop-button control button${isRace || !animationStatus.isActive ? ' disabled' : ''}`}
            type="button"
            onClick={() => stopTestDrive()}
            disabled={isRace || !animationStatus.isActive}
          >
            II
          </button>
        </div>
        <span className="car-name">
          {props.car.name.toUpperCase()}
        </span>
      </div>
      <div className="road">
        <div className="car" style={{ transform: `translateX(${animationStatus.position}px)` }}>
          <Car car={props.car} />
        </div>
        <img src={flagImage} alt="flag" className="flag" />
      </div>
    </div>
  );
}

export default LaunchPad;
