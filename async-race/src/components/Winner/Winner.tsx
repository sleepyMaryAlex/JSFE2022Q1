import { IWinnerData } from '../../types/types';
import Car from '../Car/Car';
import './Winner.css';

function Winner(props: { winner: IWinnerData, index: number }) {
  return (
    <tr>
      <td>{props.index}</td>
      <td><Car car={props.winner.car} /></td>
      <td>{props.winner.car.name.toUpperCase()}</td>
      <td>{props.winner.wins}</td>
      <td>{props.winner.time}</td>
    </tr>
  );
}

export default Winner;
