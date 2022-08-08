import React, { useReducer, useState } from 'react';
import './App.css';
import Common from './app/common';
import Loader from './app/loader';
import reducer from './app/reducer';
import Footer from './components/Footer/Footer';
import GarageView from './components/GarageView/GarageView';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import WinnersView from './components/WinnersView/WinnersView';
import {
  IAppState, ICarData, ICreateCar, IModalData, ISortingOptions, IUpdateCar,
} from './types/types';

export const RaceStatusContext = React.createContext({ isRace: false, isReset: false });
export const SelectedCarContext = React.createContext(null as ICarData | null);

function App() {
  const [isGarageView, displayGarageView] = useState(true);
  const [winner, setWinner] = useState(null as IModalData | null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    garagePage: 1,
    cars: [],
    carsCount: 0,
    winnersPage: 1,
    winners: [],
    winnersCount: 0,
    sortingOptions: { sort: 'id', order: 'ASC' },
    isRace: false,
    isReset: false,
    carStatuses: [],
    selectedCar: null,
  } as IAppState);

  const getCars = async (page: number) => {
    const data = await Loader.getCars(page, 7);
    const action = { type: 'UPDATE_CARS_DATA', cars: data.cars, carsCount: data.count };
    dispatch(action);
  };

  const createCar = async (car: ICreateCar) => {
    await Loader.createCar(car);
    const carsData = await Loader.getCars(state.garagePage, 7);
    const action = {
      type: 'UPDATE_CARS_DATA', cars: carsData.cars, carsCount: carsData.count, clearSelectedCar: false,
    };
    dispatch(action);
  };

  const updateCar = async (car: IUpdateCar) => {
    await Loader.updateCar(car);
    const carsData = await Loader.getCars(state.garagePage);
    const carsAction = {
      type: 'UPDATE_CARS_DATA', cars: carsData.cars, carsCount: carsData.count, clearSelectedCar: true,
    };
    dispatch(carsAction);
    const winnersData = await Loader.getWinners(
      state.winnersPage,
      10,
      state.sortingOptions.sort,
      state.sortingOptions.order,
    );
    const winnersAction = {
      type: 'UPDATE_WINNERS_DATA',
      winners: winnersData.winners,
      winnersCount: winnersData.count,
    };
    dispatch(winnersAction);
  };

  const removeCar = async (id: number) => {
    await Loader.removeCar(id);
    const carsData = await Loader.getCars(state.garagePage);
    if (state.garagePage * 7 - carsData.count >= 7 && state.garagePage !== 1) {
      const action = { type: 'UPDATE_GARAGE_PAGE', garagePage: state.garagePage - 1 };
      dispatch(action);
    } else {
      const clearSelectedCar = state.selectedCar?.id === id;
      const action = {
        type: 'UPDATE_CARS_DATA', cars: carsData.cars, carsCount: carsData.count, clearSelectedCar,
      };
      dispatch(action);
    }
    const winnersData = await Loader.getWinners(
      state.winnersPage,
      10,
      state.sortingOptions.sort,
      state.sortingOptions.order,
    );
    if (state.winnersPage * 10 - winnersData.count >= 7 && state.winnersPage !== 1) {
      const action = { type: 'UPDATE_WINNERS_PAGE', winnersPage: state.winnersPage - 1 };
      dispatch(action);
    } else {
      const action = {
        type: 'UPDATE_WINNERS_DATA',
        winners: winnersData.winners,
        winnersCount: winnersData.count,
      };
      dispatch(action);
    }
  };

  const generateCars = async () => {
    const cars = Array(100).fill(null).map(() => ({
      name: `${Common.getRandomBrand()} ${Common.getRandomModel()}`,
      color: Common.getRandomColor(),
      url: Common.getRandomUrl(),
    }));
    const promises = cars.map((car) => Loader.createCar(car));
    await Promise.all(promises);
    const carsData = await Loader.getCars(state.garagePage);
    const action = {
      type: 'UPDATE_CARS_DATA', cars: carsData.cars, carsCount: carsData.count, clearSelectedCar: false,
    };
    dispatch(action);
  };

  const setGaragePage = (garagePage: number) => {
    const action = { type: 'UPDATE_GARAGE_PAGE', garagePage };
    dispatch(action);
  };

  const getWinners = async (sortingOptions: ISortingOptions) => {
    const winnersData = await Loader.getWinners(
      state.winnersPage,
      10,
      sortingOptions.sort,
      sortingOptions.order,
    );
    const action = { type: 'UPDATE_WINNERS_DATA', winners: winnersData.winners, winnersCount: winnersData.count };
    dispatch(action);
  };

  const setWinnersPage = (winnersPage: number) => {
    const action = { type: 'UPDATE_WINNERS_PAGE', winnersPage };
    dispatch(action);
  };

  const setSortingOptions = (sortingOptions: ISortingOptions) => {
    const action = { type: 'UPDATE_SORTING_OPTIONS', sortingOptions };
    dispatch(action);
  };

  const drive = async (id: number) => {
    const status = await Loader.drive(id);
    const action = {
      type: 'UPDATE_CAR_STATUS', id, velocity: 0, isActive: true,
    };
    dispatch(action);
    if (status) {
      return Promise.resolve(id);
    }
    return Promise.reject(id);
  };

  const startTestDrive = async (id: number) => {
    const { velocity } = await Loader.startEngine(id);
    const action = {
      type: 'UPDATE_CAR_STATUS', id, velocity, isActive: true,
    };
    dispatch(action);
    drive(id);
  };

  const stopTestDrive = async (id: number) => {
    await Loader.stopEngine(id);
    const action = {
      type: 'UPDATE_CAR_STATUS', id, velocity: 0, isActive: false,
    };
    dispatch(action);
  };

  const startRace = async () => {
    const promises = state.cars.map((car) => Loader.startEngine(car.id));
    const velocities = await Promise.all(promises);
    const carStatuses = state.cars.map(
      (car, index) => ({ id: car.id, velocity: velocities[index].velocity, isActive: true }),
    );
    const action = {
      type: 'UPDATE_RACE_DATA', isRace: true, isReset: false, statuses: carStatuses,
    };
    dispatch(action);
    const start = performance.now();
    const id = await Promise.any(state.cars.map((car) => drive(car.id))).catch(() => null);
    const stop = performance.now();
    if (id) {
      const elapsed = Math.round((stop - start) / 10) / 100;
      const winnerResult = { id, time: elapsed };
      await Loader.saveWinner(winnerResult);
      const winnerCar = state.cars.find((car) => car.id === id) as ICarData;
      setWinner({ car: winnerCar, time: winnerResult.time });
      setIsModalOpen(true);
      const winnersData = await Loader.getWinners(
        state.winnersPage,
        10,
        state.sortingOptions.sort,
        state.sortingOptions.order,
      );
      const winnersAction = {
        type: 'UPDATE_WINNERS_DATA', winners: winnersData.winners, winnersCount: winnersData.count,
      };
      dispatch(winnersAction);
    }
  };

  const stopRace = async () => {
    const promises = state.cars.map((car) => Loader.stopEngine(car.id));
    await Promise.all(promises);
    const carStatuses = state.cars.map((car) => ({ id: car.id, velocity: 0, isActive: false }));
    const action = {
      type: 'UPDATE_RACE_DATA', isRace: false, isReset: true, statuses: carStatuses,
    };
    dispatch(action);
  };

  const selectCar = (car: ICarData | null) => {
    const action = { type: 'SELECT_CAR', car };
    dispatch(action);
  };

  return (
    <div className={`wrapper${isModalOpen ? ' wrapper_overlay' : ''}`}>
      <RaceStatusContext.Provider value={{ isRace: state.isRace, isReset: state.isReset }}>
        <SelectedCarContext.Provider value={state.selectedCar}>
          <Header displayGarageView={displayGarageView} />
          <GarageView
            visible={isGarageView}
            page={state.garagePage}
            setPage={setGaragePage}
            cars={state.cars}
            carsCount={state.carsCount}
            getCars={getCars}
            createCar={createCar}
            updateCar={updateCar}
            removeCar={removeCar}
            generateCars={generateCars}
            carStatuses={state.carStatuses}
            startTestDrive={startTestDrive}
            stopTestDrive={stopTestDrive}
            startRace={startRace}
            stopRace={stopRace}
            selectCar={selectCar}
          />
          <WinnersView
            visible={!isGarageView}
            page={state.winnersPage}
            setPage={setWinnersPage}
            winners={state.winners}
            winnersCount={state.winnersCount}
            getWinners={getWinners}
            sortingOptions={state.sortingOptions}
            setSortingOptions={setSortingOptions}
          />
          <Modal winner={winner} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          <Footer />
        </SelectedCarContext.Provider>
      </RaceStatusContext.Provider>
    </div>
  );
}

export default App;
