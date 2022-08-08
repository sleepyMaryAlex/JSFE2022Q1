import url1 from '../assets/car1.svg';
import url2 from '../assets/car2.svg';
import url3 from '../assets/car3.svg';
import url4 from '../assets/car4.svg';
import url5 from '../assets/car5.svg';
import url6 from '../assets/car6.svg';
import url7 from '../assets/car7.svg';
import url8 from '../assets/car8.svg';
import url9 from '../assets/car9.svg';
import url10 from '../assets/car10.svg';
import url11 from '../assets/car11.svg';
import url12 from '../assets/car12.svg';

const brands = [
  'ACURA',
  'ALFA ROMEO',
  'ALPINE',
  'APOLLO',
  'APPLE',
  'ASTON MARTIN',
  'AUDI',
  'AUTOMOBILI PININFARINA',
  'BENTLEY',
  'BMW',
  'BOLLINGER',
  'BRILLIANCE',
  'BUGATTI',
  'BUICK',
  'BYD',
  'CADILLAC',
  'CHANA',
  'CHERY',
  'CHEVROLET',
  'CHRYSLER',
  'CITROEN',
  'CONTINENTAL',
  'CUPRA',
  'DACIA',
  'DAEWOO',
  'DAIHATSU',
  'DATSUN',
  'DETROIT ELECTRIC',
  'DODGE',
  'DS AUTOMOBILES',
  'FAW',
  'FERRARI',
  'FIAT',
  'FISKER',
  'FORD',
  'FOXTRON',
  'GEELY',
  'GENESIS',
  'GMC',
  'GREAT WALL',
  'HAVAL',
  'HONDA',
  'HUMMER',
  'HYUNDAI',
  'INEOS',
  'INFINITI',
  'IRAN KHODRO',
  'JAC',
  'JAGUAR',
  'JEEP',
  'JETOUR',
  'KIA',
  'KOENIGSEGG',
  'LADA',
  'LAMBORGHINI',
  'LANCIA',
  'LAND ROVER',
  'LEXUS',
  'LIFAN',
  'LINCOLN',
  'LORDSTOWN',
  'LOTUS',
  'LUCID',
  'LVCHI',
  'LYNK & CO',
  'MASERATI',
  'MAYBACH',
  'MAZDA',
  'MCLAREN',
  'MERCEDES-BENZ',
  'MG',
  'MINI',
  'MITSUBISHI',
  'NIKOLA',
  'NIO',
  'NISSAN',
  'OPEL',
  'PAGANI',
  'PEUGEOT',
  'POLESTAR',
  'PORSCHE',
  'QOROS',
  'RANGE ROVER',
  'RAVON',
  'RENAULT',
  'RIMAC',
  'RIVIAN',
  'ROLLS-ROYCE',
  'SAAB',
  'SAIPA',
  'SEAT',
  'SKODA',
  'SMART',
  'SSANGYONG',
  'SSC NORTH AMERICA',
  'STELLANTIS',
  'SUBARU',
  'SUZUKI',
  'TATA',
  'TESLA',
  'TORSUS',
  'TOYOTA',
  'VINFAST',
  'VOLKSWAGEN',
  'VOLVO',
  'XPENG',
  'ZOTYE',
];

const models = [
  'DURANGO',
  'RAM',
  'CHALLENGER',
  'CHARGER',
  'GRAND CARAVAN',
  'X7',
  'X5',
  'X3',
  'X6 M',
  'X6',
  'X1',
  'X4',
  'C3 AIRCROSS',
  'C5 AIRCROSS',
  'DUSTER',
  'CR-V',
  'COROLLA',
  'C4 CACTUS',
  'DS3 CROSSBACK',
  'C1',
  'C3',
  'BERLINGO MULTISPACE',
  'DS4 CROSSBACK',
  'UX 250H',
  'NX 300H',
  'LC 500',
  'RX 350/200T',
  'RAPID',
  'LARGUS',
  'IS 200T',
  'LS 500H',
  'RX',
  'ES 200/250/350',
  'HATCHBACK',
  'CX-5',
  'SEDAN',
  'CX-30',
  'CX-9',
  'CX-3',
  'MX-5 ROADSTER',
  'PHANTOM',
  'CAMRY',
  'POLO',
  'CULLINAN',
  'GHOST',
  'DAWN',
  'DUSTER',
  'ARKANA',
  'SANDERO',
  'LOGAN',
  'TRAFIC FOURGON',
  'LOGAN MCV',
  'CAPTUR',
  'KADJAR',
  'RAV4',
  'RIO',
  'CRETA',
  'SOLARIS',
];

const carURLs = [
  url1,
  url2,
  url3,
  url4,
  url5,
  url6,
  url7,
  url8,
  url9,
  url10,
  url11,
  url12,
];

class Common {
  static getRandomColor(): string {
    const symbols = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += symbols[Math.floor(Math.random() * symbols.length)];
    }
    return color;
  }

  static getRandomUrl(): string {
    return carURLs[Math.floor(Math.random() * carURLs.length)];
  }

  static getRandomBrand(): string {
    return brands[Math.floor(Math.random() * brands.length)];
  }

  static getRandomModel(): string {
    return models[Math.floor(Math.random() * models.length)];
  }
}

export default Common;
