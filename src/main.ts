import './style.css';

// My components
import App from './components/App';

// enums
import { Country, AdministrativeLevel } from './lib/enums';


const app = new App();

// 1. Set the country [fin, swe, nor, den]
app.setCountry(Country.finland)

// 2. Set the administrative level ['municipality', 'province']
app.setAdministrativeLevel(AdministrativeLevel.municipality)

// last: Initialize it
app.init()