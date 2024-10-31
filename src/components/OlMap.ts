
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON'
import Style from 'ol/style/Style';
import { Fill, Stroke } from 'ol/style';

import MapProvider from './MapProvider';

// enums
import { AdministrativeLevel, Country } from '../lib/enums';

// definitions
import { MapStyle } from '../lib/types';

export default class OlMap {
    map: Map;
    view: View;
    layer: VectorLayer;
    source: VectorSource;

    country: Country | null;
    administrativeLevel: AdministrativeLevel | null;

    style: MapStyle;

    constructor() {
        this.map = new Map();
        this.view = new View();
        this.layer = new VectorLayer();
        this.source = new VectorSource();

        this.country = null;
        this.administrativeLevel = null;

        // Default style
        this.style = {
            backgroundColor: 'lightgrey',
            fillColor: 'lightblue',
            strokeWidth: 0.2,
            strokeColor: 'darkblue',
            highlightStrokeColor: 'red',
            highlightFillColor: 'yellow',
            highlightStrokeWidth: 1
        }
    }

    init(mapId: string) {

        if (!this.country || !this.administrativeLevel) {
            throw new Error('Country and administrative level must be set before initializing the map');
        }
        
        // Set the target HTMLDivElement
        this.map.setTarget(mapId);

        // Remove controls
        this.map.getControls().clear();

        // Create the map
        const vectorMap = new MapProvider().get(this.country, this.administrativeLevel);
        this.source.addFeatures(new GeoJSON().readFeatures(vectorMap));
        this.layer.setSource(this.source);
        this.map.addLayer(this.layer);
        this.map.setView(this.view);
        
        // Fit country to the viewport
        const extent = this.source.getExtent();
        this.view.fit(extent, { size: this.map.getSize(), padding: [60, 60, 60, 60] });

        // Set the style
        this.layer.setBackground(this.style.backgroundColor);
        this.layer.setStyle(new Style({
            fill: new Fill({ color: this.style.fillColor }),
            stroke: this.style.strokeWidth ? new Stroke({ 
                color: this.style.strokeColor, 
                width: this.style.strokeWidth 
            }): undefined
        }));
    }
}