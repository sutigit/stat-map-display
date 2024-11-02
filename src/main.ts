// olmap component
import Map from './olmap';

// definitions
import { MapSettings, MapStyle } from './lib/types';

// enums 
import { Country, AdministrativeLevel } from './lib/enums';

class StatMapDisplay {
    mapId: string;
    map: Map;

    country: Country | null;
    administrativeLevel: AdministrativeLevel | null;
    style: MapStyle | null;
    settings: MapSettings | null;

    constructor(id: string) {
        this.mapId = id;
        this.map = new Map();

        this.country = null;
        this.administrativeLevel = null
        this.style = null;
        this.settings = null;
    }

    setCountry(country: Country) {
        this.country = country;
    }

    setAdministrativeLevel(level: AdministrativeLevel) {
        this.administrativeLevel = level;
    }

    setStyle(style: MapStyle) {
        this.style = style;
    }

    setSettings(settings: MapSettings) {
        this.settings = settings;
    }

    init() {
        if (!this.country || !this.administrativeLevel) {
            throw new Error('Country and administrative level must be set before initializing the map');
        }

        this.map.country = this.country;
        this.map.administrativeLevel = this.administrativeLevel;
        this.style && (this.map.style = this.style);
        this.settings && (this.map.settings = this.settings);

        this.map.create(this.mapId);
    }
}

export { Country, AdministrativeLevel };
export default StatMapDisplay;