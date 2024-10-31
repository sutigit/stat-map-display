
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON'
import MapProvider from './MapProvider';


// enums
import { AdministrativeLevel, Country } from '../lib/enums';

export default class OlMap {
    map: Map;
    view: View;
    layer: VectorLayer;
    source: VectorSource;

    country: Country | null;
    administrativeLevel: AdministrativeLevel | null;

    constructor() {
        this.map = new Map();
        this.view = new View();
        this.layer = new VectorLayer();
        this.source = new VectorSource();

        this.country = null;
        this.administrativeLevel = null;
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

    }
}