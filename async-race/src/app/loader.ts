import {
  ICarData, ICarsData, ICreateCar, ICreateWinner, IStartEngine,
  IUpdateCar, IUpdateWinner, IWinnerData, IWinnersData,
} from '../types/types';
import defaultCarImageUrl from '../assets/car1.svg';

const baseUrl = 'http://localhost:3000';

const garageUrl = `${baseUrl}/garage`;
const engineUrl = `${baseUrl}/engine`;
const winnersUrl = `${baseUrl}/winners`;

class Loader {
  public static async getCars(page = 1, limit = 7): Promise<ICarsData> {
    const response = await fetch(`${garageUrl}?_page=${page}&_limit=${limit}`);
    const cars = await response.json();
    return {
      cars: cars.map((car: ICarData) => (car.url
        ? { ...car }
        : { ...car, url: defaultCarImageUrl })),
      count: Number(response.headers.get('X-Total-Count')) || 0,
    };
  }

  public static async getCar(id: number) {
    const response = await fetch(`${garageUrl}/${id}`);
    const car = await response.json();
    return car.url ? { ...car } : { ...car, url: defaultCarImageUrl };
  }

  public static async getWinners(page = 1, limit = 10, sort: string = 'id', order: string = 'ASC'): Promise<IWinnersData> {
    const response = await fetch(`${winnersUrl}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    const winners = await response.json();
    const promises = winners.map(async (winner: IWinnerData) => ({
      ...winner,
      car: await this.getCar(winner.id),
    }));

    return {
      winners: await Promise.all(promises),
      count: Number(response.headers.get('X-Total-Count')) || 0,
    };
  }

  public static async createCar(car: ICreateCar): Promise<void> {
    await fetch(garageUrl, {
      method: 'POST',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static async removeCar(id: number) {
    await fetch(`${garageUrl}/${id}`, {
      method: 'DELETE',
    });

    const winner = await this.getWinner(id);
    if (winner) {
      await this.removeWinner(id);
    }
  }

  public static async removeWinner(id: number) {
    await fetch(`${winnersUrl}/${id}`, {
      method: 'DELETE',
    });
  }

  public static async updateCar(car: IUpdateCar) {
    await fetch(`${garageUrl}/${car.id}`, {
      method: 'PUT',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static async getWinner(id: number) {
    const response = await fetch(`${winnersUrl}/${id}`);
    if (response.status === 404) {
      return null;
    }
    return response.json();
  }

  public static async createWinner(winner: ICreateWinner) {
    await fetch(winnersUrl, {
      method: 'POST',
      body: JSON.stringify({ ...winner, wins: 1 }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static async updateWinner(id: number, winner: IUpdateWinner) {
    await fetch(`${winnersUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(winner),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static async saveWinner(winner: ICreateWinner) {
    const current = await this.getWinner(winner.id);

    if (current) {
      await this.updateWinner(winner.id, {
        id: winner.id,
        wins: current.wins + 1,
        time: winner.time < current.time ? winner.time : current.time,
      });
    } else {
      await this.createWinner({
        id: winner.id,
        time: winner.time,
      });
    }
  }

  public static async startEngine(id: number): Promise<IStartEngine> {
    const response = await fetch(`${engineUrl}?id=${id}&status=started`, {
      method: 'PATCH',
    });
    return response.json();
  }

  public static async stopEngine(id: number) {
    await fetch(`${engineUrl}?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
  }

  public static async drive(id: number) {
    const response = await fetch(`${engineUrl}?id=${id}&status=drive`, { method: 'PATCH' });
    return response.status === 200;
  }
}

export default Loader;
