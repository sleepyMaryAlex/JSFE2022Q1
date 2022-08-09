import {
  ICarStatus, ICarData,
  IAction, IUpdateCarsDataAction, IUpdateRaceData, IUpdateCarStatus, IUpdateGaragePage,
  IUpdateSortingOptions, IUpdateWinnersDataAction, IUpdateWinnersPage, ISelectCar,
  IAppState,
} from '../types/types';

function resolveCarStatuses(prev: ICarStatus[], cars: ICarData[]) {
  const curr = [] as ICarStatus[];
  cars.forEach((car) => {
    const carStatus = prev.find((status) => status.id === car.id);
    if (carStatus) {
      curr.push({ ...carStatus });
    } else {
      curr.push({ id: car.id, velocity: 0, isActive: false });
    }
  });
  return curr;
}

function reducer(state: IAppState, action: IAction) {
  switch (action.type) {
    case 'UPDATE_CARS_DATA':
      const { cars, carsCount, clearSelectedCar } = action as IUpdateCarsDataAction;
      const selectedCar = clearSelectedCar ? null : state.selectedCar;
      return {
        ...state,
        cars,
        carsCount,
        carStatuses: resolveCarStatuses(state.carStatuses, cars),
        selectedCar,
      };
    case 'UPDATE_GARAGE_PAGE':
      const { garagePage } = action as IUpdateGaragePage;
      return { ...state, garagePage };
    case 'UPDATE_WINNERS_DATA':
      const { winners, winnersCount } = action as IUpdateWinnersDataAction;
      return { ...state, winners, winnersCount };
    case 'UPDATE_WINNERS_PAGE':
      const { winnersPage } = action as IUpdateWinnersPage;
      return { ...state, winnersPage };
    case 'UPDATE_SORTING_OPTIONS':
      const { sortingOptions } = action as IUpdateSortingOptions;
      return { ...state, sortingOptions };
    case 'UPDATE_CAR_STATUS':
      const { id, velocity, isActive } = action as IUpdateCarStatus;
      const carStatuses = [...state.carStatuses
        .filter((carStatus) => carStatus.id !== id), { id, velocity, isActive }];
      return { ...state, carStatuses };
    case 'UPDATE_RACE_DATA':
      const { isRace, isReset, statuses: values } = action as IUpdateRaceData;
      return {
        ...state, isRace, isReset, carStatuses: values,
      };
    case 'SELECT_CAR':
      const { car } = action as ISelectCar;
      return { ...state, selectedCar: car };
    default:
      return state;
  }
}

export default reducer;
