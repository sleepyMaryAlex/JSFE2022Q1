import { IGarage } from '../../types/types';
import LaunchPad from '../LaunchPad/LaunchPad';
import './Garage.css';

function Garage(props: IGarage) {
  return (
    <div className="garage">
      <h1>
        GARAGE (
        <span className="garage__count">{props.count}</span>
        )
      </h1>
      <h2>
        PAGE
        <span className="garage__page">{props.page}</span>
      </h2>
      <div className="cars">
        {props.cars.map((car) => (
          <LaunchPad
            car={car}
            key={car.id}
            selectCar={props.selectCar}
            removeCar={props.removeCar}
            velocity={props.carStatuses.find((carStatus) => carStatus.id === car.id)?.velocity || 0}
            startTestDrive={props.startTestDrive}
            stopTestDrive={props.stopTestDrive}
          />
        ))}
      </div>
    </div>
  );
}

export default Garage;
