// olmap component
import OlMap from './olmap';

// definitions
import { MapSettings, MapStyle } from './lib/types';

// enums 
import { Country, AdministrativeLevel } from './lib/enums';

class StatMapDisplay {
    private mapId: string;
    private map: OlMap;
    private country: Country;
    private administrativeLevel: AdministrativeLevel;
    private style: MapStyle;
    private settings: MapSettings;

    constructor({
        id,
        country,
        administrativeLevel,
        style,
        settings
    }: {
        id: string,
        country: Country,
        administrativeLevel: AdministrativeLevel,
        style?: Partial<MapStyle>,
        settings?: Partial<MapSettings>
    }) {
        this.mapId = id;
        this.country = country;
        this.administrativeLevel = administrativeLevel;

        // Default style
        const defaultStyle = {
            backgroundColor: 'lightgrey',
            fillColor: 'lightblue',
            strokeWidth: 0.2,
            strokeColor: 'darkblue',

            highlightStrokeColor: 'rgba(0, 0, 0, 0.7)',
            highlightFillColor: 'blue',
            highlightStrokeWidth: 0.2,

            selectedStrokeColor: 'rgba(0, 0, 0, 1)',
            selectedFillColor: 'darkblue',
            selectedStrokeWidth: 0.2,

            paddingTop: 60,
            paddingBottom: 60,
            paddingLeft: 60,
            paddingRight: 60
        }
        this.style = { ...defaultStyle, ...style };

        // Default settings
        const defaultSettings = {
            minZoom: 6,
            maxZoom: 10,
            highlight: true,
            select: true,
            maxSelections: 3
        }
        this.settings = { ...defaultSettings, ...settings };

        // Set default style and settings
        this.map = new OlMap(
            this.mapId, 
            this.country, 
            this.administrativeLevel, 
            this.style, 
            this.settings
        );

        this.map.init();
    }

    setCountry(country: Country) {
        this.country = country;
    }

    setAdministrativeLevel(level: AdministrativeLevel) {
        this.administrativeLevel = level;
    }

    updateStyle(newStyle: Partial<MapStyle>) {
        this.style = { ...this.style, ...newStyle };
        this.map.updateStyles(this.style);
    }

    updateSettings(newSettings: Partial<MapSettings>) {
        this.settings = { ...this.settings, ...newSettings };
        this.map.updateSettings(this.settings);
    }
}

export { Country, AdministrativeLevel };
export default StatMapDisplay;