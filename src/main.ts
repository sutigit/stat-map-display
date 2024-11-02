// olmap component
import OlMap from './olmap';

// definitions
import { MapSettings, MapStyle } from './lib/types';

// enums 
import { Country, AdministrativeLevel } from './lib/enums';

class StatMapDisplay {
    private mapId: string;
    private map: OlMap;
    private country: Country | null;
    private administrativeLevel: AdministrativeLevel | null;
    private style: MapStyle | null;
    private settings: MapSettings | null;

    constructor(id: string) {
        this.mapId = id;
        this.country = null;
        this.administrativeLevel = null
        this.style = null;
        this.settings = null;

        this.map = new OlMap();
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
        if (this.country && this.administrativeLevel) {
            this.map.create({
                mapId: this.mapId,
                country: this.country,
                administrativeLevel: this.administrativeLevel,
                style: this.style,
                settings: this.settings
            });
        }
        else {
            throw new Error('Country and administrative level must be set before initializing the map');
        }
    }
}

export { Country, AdministrativeLevel };
export default StatMapDisplay;