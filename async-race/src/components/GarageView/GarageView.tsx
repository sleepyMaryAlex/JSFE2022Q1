import { useEffect, useContext } from 'react';
import { RaceStatusContext } from '../../App';
import { IGarageView } from '../../types/types';
import Forms from '../Forms/Forms';
import Garage from '../Garage/Garage';
import Pagination from '../Pagination/Pagination';
import RaceControls from '../RaceControls/RaceControls';
import './GarageView.css';

function GarageView(props: IGarageView) {
  const { isRace } = useContext(RaceStatusContext);

  useEffect(() => {
    props.getCars(props.page);
  }, [props.page]);

  const isActiveCars = props.carStatuses.some((carStatus) => carStatus.isActive);
  const isMovingCars = props.carStatuses.some((carStatus) => carStatus.velocity > 0);

  return (
    <div className={`garage-view ${props.visible ? 'visible' : 'invisible'}`}>
      <Forms createCar={props.createCar} updateCar={props.updateCar} />
      <RaceControls
        generateCars={props.generateCars}
        isRaceBlocked={props.carsCount === 0 || isActiveCars}
        isResetBlocked={props.carsCount === 0 || isMovingCars}
        startRace={props.startRace}
        stopRace={props.stopRace}
      />
      <Garage
        cars={props.cars}
        count={props.carsCount}
        page={props.page}
        removeCar={props.removeCar}
        carStatuses={props.carStatuses}
        startTestDrive={props.startTestDrive}
        stopTestDrive={props.stopTestDrive}
        selectCar={props.selectCar}
      />
      <Pagination
        page={props.page}
        pageSize={7}
        setPage={props.setPage}
        count={props.carsCount}
        isDisabled={isRace || isActiveCars}
      />
    </div>
  );
}

export default GarageView;
