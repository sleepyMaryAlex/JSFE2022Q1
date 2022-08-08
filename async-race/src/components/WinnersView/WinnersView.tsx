import { useEffect } from 'react';
import { IWinnersView } from '../../types/types';
import Pagination from '../Pagination/Pagination';
import Winner from '../Winner/Winner';
import './WinnersView.css';

function WinnersView(props: IWinnersView) {
  useEffect(() => {
    props.getWinners(props.sortingOptions);
  }, [props.page, props.sortingOptions]);

  const resolveSortingOptions = (sort: string) => {
    const order = props.sortingOptions.sort === sort && props.sortingOptions.order === 'ASC' ? 'DESC' : 'ASC';
    return { sort, order };
  };

  const resolveSortingSign = (sort: string) => {
    if (props.sortingOptions.sort === sort) {
      return props.sortingOptions.order === 'ASC' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
    <div className={`winners-view ${props.visible ? 'visible' : 'invisible'}`}>
      <h1>
        WINNERS (
        <span className="winners-view__count">
          {props.winnersCount}
        </span>
        )
      </h1>
      <h2>
        PAGE
        {' '}
        {props.page}
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>№</th>
            <th>CAR</th>
            <th>BRAND</th>
            <th className="table__th" onClick={() => { props.setSortingOptions(resolveSortingOptions('wins')); }}>
              WINS
              <span>{resolveSortingSign('wins')}</span>
            </th>
            <th className="table__th" onClick={() => { props.setSortingOptions(resolveSortingOptions('time')); }}>
              BEST TIME
              <span>{resolveSortingSign('time')}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.winners.map((winner, index) => (
            <Winner
              winner={winner}
              index={(props.page - 1) * 10 + index + 1}
              key={winner.id}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        page={props.page}
        pageSize={10}
        setPage={props.setPage}
        count={props.winnersCount}
        isDisabled={false}
      />
    </div>
  );
}

export default WinnersView;
