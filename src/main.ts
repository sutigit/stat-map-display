// olmap component
import OlMap from './olmap';

// definitions
import { MapSettings, MapStyle } from './lib/types';

// enums 
import { Country, AdministrativeLevel, ResolutionLevel } from './lib/enums';

class StatMapDisplay {
    private mapId: string;
    private map: OlMap;
    private country: Country;
    private administrativeLevel: AdministrativeLevel;
    private resolution: ResolutionLevel;
    private style: MapStyle;
    private settings: MapSettings;

    constructor({
        id,
        country,
        administrativeLevel,
        resolution,
        style,
        settings
    }: {
        id: string,
        country: Country,
        administrativeLevel: AdministrativeLevel,
        resolution: ResolutionLevel,
        style?: Partial<MapStyle>,
        settings?: Partial<MapSettings>
    }) {
        this.mapId = id;
        this.country = country;
        this.administrativeLevel = administrativeLevel;
        this.resolution = resolution;

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
            this.resolution,
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
        // Note: Do not call this in fast intervals or in animations
        // since the operation can be expensive.
        // For animations use animateStyle instead
        this.style = { ...this.style, ...newStyle };
        this.map.updateStyles(this.style);
    }

    updateSettings(newSettings: Partial<MapSettings>) {
        // Note: Do not call this in fast intervals or in animations
        // since the operation can be expensive
        this.settings = { ...this.settings, ...newSettings };
        this.map.updateSettings(this.settings);
    }

    getCanvas() {
        // Can only be retrieved after the map has been initialized
        return this.map.getCanvas();
    }

    getMapSVG() {
        // Can only be retrieved after the map has been initialized
        return this.map.getMapSVG();
    }
}

export { Country, AdministrativeLevel };
export default StatMapDisplay;