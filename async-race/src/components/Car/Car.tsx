import { ICarData } from '../../types/types';
import './Car.css';

function Car(props: { car: ICarData }) {
  const styles = {
    WebkitMaskImage: `url(${props.car.url})`,
    maskImage: `url(${props.car.url})`,
    background: props.car.color,
  };
  return (
    <div className="car__image" style={styles} />
  );
}

export default Car;
