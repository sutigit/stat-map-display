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

// 0. Create an instance with the target div id
const view = new StatMapDisplay('target');

// 1. Set the country [fin]
view.setCountry(Country.FINLAND)

// 2. Set the administrative level ['municipality', 'province']
view.setAdministrativeLevel(AdministrativeLevel.MUNICIPALITY)

// 3. Add stylings (optional)
// view.setStyle(...)

// 4. Add settings (optional)
// view.setSettings(...)

// 5. Initialize it
view.init()