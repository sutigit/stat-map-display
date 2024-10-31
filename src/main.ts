import './style.css';

// My components
import App from './components/App';

// enums
import { Country, AdministrativeLevel } from './lib/enums';


const main = new App();

// 1. Set the country [fin, swe, nor, den]
main.setCountry(Country.finland)

// 2. Set the administrative level ['municipality', 'province']
main.setAdministrativeLevel(AdministrativeLevel.municipality)

// last: Initialize it
main.init()