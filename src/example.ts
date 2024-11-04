// Create a div element with id 'target' for demonstration purposes
import './style.css';
const container = document.createElement('div');
container.id = 'target';
container.style.width = '100%';
container.style.height = '100%';
document.querySelector<HTMLDivElement>('#app')!.appendChild(container)


// EXAMPLE USAGE
// Import
import StatMapDisplay, { Country, AdministrativeLevel } from './main';

// Instantiate the class
const view = new StatMapDisplay({
    id: 'target',
    country: Country.FINLAND,
    administrativeLevel: AdministrativeLevel.MUNICIPALITY,
    // style: { ... }, optional
    // settings: { ... } optional
});

// view.updateStyle({
//     backgroundColor: 'red',
//     highlightFillColor: 'green'
// })

// view.updateSettings({
//     minZoom: 5
// })


