// Create a div element with id 'target' to attach the map to
import './style.css';
const container = document.createElement('div');
container.id = 'target';
container.style.width = '100%';
container.style.height = '100%';
document.querySelector<HTMLDivElement>('#app')!.appendChild(container)


// EXAMPLES

// Example: Importing the class --------------------------------------------------------
import StatMapDisplay, { Country, AdministrativeLevel, ResolutionLevel } from './main';


// Example: Instantiating the class -----------------------------------------------------
const view = new StatMapDisplay({
    id: 'target',
    country: Country.FINLAND,
    administrativeLevel: AdministrativeLevel.MUNICIPALITY,
    resolution: ResolutionLevel.LEVEL_1,
});

