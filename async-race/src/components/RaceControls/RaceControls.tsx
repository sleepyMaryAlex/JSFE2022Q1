import { useContext } from 'react';
import { RaceStatusContext } from '../../App';
import { IRaceControls } from '../../types/types';
import './RaceControls.css';

function RaceControls(props: IRaceControls) {
  const { isRace } = useContext(RaceStatusContext);

  return (
    <div className="race-controls">
      <button
        type="button"
        className={`race-controls__race-button button${isRace || props.isRaceBlocked ? ' disabled' : ''}`}
        disabled={isRace || props.isRaceBlocked}
        onClick={() => props.startRace()}
      >
        RACE
      </button>
      <button
        type="button"
        className={`race-controls__reset-button button${!isRace || props.isResetBlocked ? ' disabled' : ''}`}
        disabled={!isRace || props.isResetBlocked}
        onClick={() => props.stopRace()}
      >
        RESET
      </button>
      <button
        type="button"
        className={`race-controls__generate-button button${isRace ? ' disabled' : ''}`}
        disabled={isRace}
        onClick={() => props.generateCars()}
      >
        GENERATE CARS
      </button>
    </div>
  );
}

export default RaceControls;
