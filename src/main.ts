// olmap component
import OlMap from './olmap';
import { Feature } from 'ol';

// definitions
import { MapSettings, MapStyle } from './lib/types';

// enums 
import { Country, AdministrativeLevel, ResolutionLevel } from 'stat-map-provider'

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

    /**
     * Update features in the map based on the features regional natcode
     * @param callback 
     * @returns void
     */
    forEachFeature(callback: (feature: Feature, natcode: string) => void) {
        const features = this.map.getFeatures();

        features.forEach((feature: Feature) => {
            const natcode = feature.get('NATCODE');
            callback(feature, natcode);
        });
    }

    /**
     * Returns the canvas element created by OpenLayers.
     * @returns canvas element of the map
     */
    getCanvas() {
        return this.map.getCanvas();
    }

    /**
     * Returns the map element created by OpenLayers.
     * @returns openlayers map element
     */
    getMap() {
        return this.map.getMap();
    }
}

export { Country, AdministrativeLevel, ResolutionLevel };
export default StatMapDisplay;