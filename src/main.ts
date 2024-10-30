import './style.css';

// My components
import Environment from './components/Environment';
import OlMap from './components/OlMap';


class Main {
  container: Environment;
  map: OlMap;

  constructor() {
    this.container = new Environment()
    this.map = new OlMap();
  }

  init() {
    this.container.init('target-map');
    this.map.init('target-map');
  }
}

// THIS IS THE APPLICATION INTERFACE
const main = new Main();

// 1. Initialize it
main.init()

// 2. Set the country [fi, swe, nor]