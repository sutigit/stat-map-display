// My components
import Container from './Container';
import Map from './OlMap';

// enums
import { Country, AdministrativeLevel } from '../lib/enums';


export default class App {
  container: Container;
  map: Map;

  country: Country | null;
  administrativeLevel: AdministrativeLevel | null;

  constructor() {
    this.container = new Container()
    this.map = new Map();

    this.country = null;
    this.administrativeLevel = null
  }

  setCountry(country: Country) {
    this.country = country;
  }

  setAdministrativeLevel(level: AdministrativeLevel) {
    this.administrativeLevel = level;
  }

  init() {
    this.container.init('target-map');

    this.map.setCountry(this.country!);
    this.map.setAdministrativeLevel(this.administrativeLevel!);
    this.map.init('target-map');
  }
}