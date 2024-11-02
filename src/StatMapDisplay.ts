// My components
import Container from './Container';
import Map from './OlMap';

// definitions
import { Country, AdministrativeLevel } from 'stat-map-provider';
import { MapStyle } from './lib/types';

export default class StatMapDisplay {
  container: Container;
  map: Map;
  
  country: Country | null;
  administrativeLevel: AdministrativeLevel | null;
  style: MapStyle | null;

  constructor() {
    this.container = new Container()
    this.map = new Map();

    this.country = null;
    this.administrativeLevel = null
    this.style = null;
  }

  setCountry(country: Country) {
    this.country = country;
  }

  setAdministrativeLevel(level: AdministrativeLevel) {
    this.administrativeLevel = level;
  }

  setStyle(style: MapStyle) {
    this.style = style;
  }

  init() {
    if (!this.country || !this.administrativeLevel) {
      throw new Error('Country and administrative level must be set before initializing the map');
    }

    this.container.init('target-map');

    this.map.country = this.country;
    this.map.administrativeLevel = this.administrativeLevel;
    this.style && (this.map.style = this.style);
    this.map.init('target-map');
  }
}