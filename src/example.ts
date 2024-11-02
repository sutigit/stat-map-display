import './style.css';

// EXAMPLE USAGE

// My components
import StatMapDisplay, { Country, AdministrativeLevel } from './main';


const view = new StatMapDisplay();

// 1. Set the country [fin, swe, nor, den]
view.setCountry(Country.FINLAND)

// 2. Set the administrative level ['municipality', 'province']
view.setAdministrativeLevel(AdministrativeLevel.MUNICIPALITY)

// 3. Add stylings (optional)

// 4. Add settings (optional)

// last: Initialize it
view.init()