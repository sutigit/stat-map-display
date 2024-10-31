import finland_municipalities from '../maps/Finland/Municipalities/finland_municipalities.json';
import finland_provinces from '../maps/Finland/Provinces/finland_provinces.json';

// enums
import { Country, AdministrativeLevel } from '../lib/enums';

export default class MapProvider {
    finland_municipalities: any;
    finland_provinces: any;

    constructor() {
        this.finland_municipalities = finland_municipalities;
        this.finland_provinces = finland_provinces;
    }

    get(country: Country, administrativeLevel: AdministrativeLevel) {
        if (country === Country.finland) {
            if (administrativeLevel === AdministrativeLevel.municipality) {
                return this.finland_municipalities;
            } else if (administrativeLevel === AdministrativeLevel.province) {
                return this.finland_provinces;
            }
        }
    }
}