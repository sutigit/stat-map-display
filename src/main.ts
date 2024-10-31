import './style.css';

// My components
import App from './components/App';

// enums
import { Country, AdministrativeLevel } from './lib/enums';


const map = new App();

// 1. Set the country [fin, swe, nor, den]
map.setCountry(Country.finland)

// 2. Set the administrative level ['municipality', 'province']
map.setAdministrativeLevel(AdministrativeLevel.municipality)

// 3. Add stylings
map.setStyle({

})

// last: Initialize it
map.init()