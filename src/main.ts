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

const main = new Main();
main.init()