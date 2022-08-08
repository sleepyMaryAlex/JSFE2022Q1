export interface ICarData {
  id: number;
  name: string;
  color: string;
  url: string;
}

export interface ICarsData {
  cars: ICarData[];
  count: number;
}

export interface IUpdateCar {
  id: number;
  name: string;
  color: string;
}

export interface ICreateCar {
  name: string;
  color: string;
  url: string;
}

export interface IWinnerData {
  id: number;
  car: ICarData;
  time: number;
  wins: number;
}

export interface IModalData {
  car: ICarData;
  time: number;
}

export interface IWinnersData {
  winners: IWinnerData[];
  count: number;
}

export interface ICreateWinner {
  id: number;
  time: number;
}

export interface IUpdateWinner extends ICreateWinner {
  wins: number;
}

export interface IStartEngine {
  velocity: number;
  distance: number;
}

export interface IGarage extends ICarsData {
  page: number;
  removeCar: (id: number) => void;
  carStatuses: ICarStatus[];
  startTestDrive: (id: number) => Promise<void>;
  stopTestDrive: (id: number) => Promise<void>;
  selectCar: (car: ICarData | null) => void
}

export interface ILaunchPad {
  car: ICarData;
  removeCar: (id: number) => void;
  velocity: number;
  startTestDrive: (id: number) => Promise<void>;
  stopTestDrive: (id: number) => Promise<void>;
  selectCar: (car: ICarData | null) => void;
}

export interface IModal {
  winner: IModalData | null;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IGarageView {
  visible: boolean;
  page: number;
  setPage: (garagePage: number) => void;
  cars: ICarData[];
  carsCount: number;
  getCars: (page: number) => void;
  createCar: (car: ICreateCar) => void;
  updateCar: (car: IUpdateCar) => void;
  removeCar: (id: number) => void;
  generateCars: () => void;
  carStatuses: ICarStatus[];
  startTestDrive: (id: number) => Promise<void>;
  stopTestDrive: (id: number) => Promise<void>;
  startRace: () => Promise<void>;
  stopRace: () => Promise<void>;
  selectCar: (car: ICarData | null) => void;
}

export interface IWinnersView {
  visible: boolean,
  page: number;
  setPage: (winnersPage: number) => void;
  winners: IWinnerData[];
  winnersCount: number;
  getWinners: (sortingOptions: ISortingOptions) => void;
  sortingOptions: ISortingOptions
  setSortingOptions: (sortingOptions: ISortingOptions) => void;
}

export interface IPagination {
  page: number;
  pageSize: number;
  setPage: (garagePage: number) => void, count: number;
  isDisabled: boolean;
}

export interface IRaceControls {
  generateCars: () => void;
  isRaceBlocked: boolean;
  isResetBlocked: boolean;
  startRace: () => Promise<void>;
  stopRace: () => Promise<void>;
}

export interface ISortingOptions {
  sort: string;
  order: string;
}

export interface ICarStatus {
  id: number;
  velocity: number;
  isActive: boolean;
}

export interface IAppState {
  garagePage: number;
  cars: ICarData[];
  carsCount: number;
  winnersPage: number;
  winners: IWinnerData[];
  winnersCount: number;
  sortingOptions: ISortingOptions;
  isRace: boolean;
  isReset: boolean;
  carStatuses: ICarStatus[];
  selectedCar: ICarData | null;
}

export interface IAction {
  type: string;
}

export interface IUpdateCarsDataAction extends IAction {
  cars: ICarData[];
  carsCount: number;
  clearSelectedCar: boolean;
}

export interface IUpdateGaragePage extends IAction {
  garagePage: number;
}

export interface IUpdateWinnersDataAction extends IAction {
  winners: IWinnerData[];
  winnersCount: number;
}

export interface IUpdateWinnersPage extends IAction {
  winnersPage: number;
}

export interface IUpdateSortingOptions extends IAction {
  sortingOptions: ISortingOptions;
}

export interface IUpdateCarStatus extends IAction {
  id: number;
  velocity: number;
  isActive: boolean;
}

export interface IUpdateRaceData extends IAction {
  isRace: boolean;
  isReset: boolean;
  statuses: ICarStatus[];
}

export interface ISelectCar extends IAction {
  car: ICarData | null;
}
