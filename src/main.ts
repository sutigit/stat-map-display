import './style.css';

// My components
import StatMapDisplay from './components/StatMapDisplay';

// Definitions
import { Country, AdministrativeLevel } from 'stat-map-provider';


const view = new StatMapDisplay();

// 1. Set the country [fin, swe, nor, den]
view.setCountry(Country.FINLAND)

// 2. Set the administrative level ['municipality', 'province']
view.setAdministrativeLevel(AdministrativeLevel.MUNICIPALITY)

// 3. Add stylings
// view.setStyle({
//     backgroundColor: 'blue',
//     fillColor: 'red',
//     strokeWidth: 1,
//     strokeColor: 'green'
// })

// last: Initialize it
view.init()