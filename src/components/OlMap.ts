
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON'

// enums
import { AdministrativeLevel, Country } from '../lib/enums';

// utils
import { joinPaths, loadShapefile } from '../lib/utils';


export default class OlMap {
    map: Map;
    view: View;
    source: any;
    layer: TileLayer;

    country: Country | null;
    administrativeLevel: AdministrativeLevel | null;

    constructor() {
        this.map = new Map({
            controls: [], // Remove all default controls
        });

        this.view = new View({
            center: [0, 0],
            zoom: 2,
        });

        this.source = new OSM();

        this.layer = new TileLayer();

        this.country = null;
        this.administrativeLevel = null;
    }

    init(mapId: string) {

        if (!this.country || !this.administrativeLevel) {
            throw new Error('Country and administrative level must be set before initializing the map');
        }

        this.map.setTarget(mapId);

        this.source = this.createSource(this.country, this.administrativeLevel);
        this.source = new OSM();
        this.layer.setSource(this.source);
        this.map.addLayer(this.layer);
        this.map.setView(this.view);
    }

    setCountry(country: Country) {
        this.country = country;
    }

    setAdministrativeLevel(level: AdministrativeLevel) {
        this.administrativeLevel = level;
    }

    // Function to load GeoJSON from Shapefile
    private createSource(country: Country, administrativeLevel: AdministrativeLevel, resolution: number = 100) {

        const path = joinPaths('shapefiles', country, administrativeLevel, resolution.toString() + 'k', '*.shp');
        
        const file = loadShapefile(path);

        console.log('File:', file);

        // const vectorSource = new VectorSource({
        //     features: new GeoJSON().readFeatures(geoJsonData, {
        //         featureProjection: 'EPSG:3857', // Reproject to Web Mercator
        //     }),
        // });

        // const vectorLayer = new VectorLayer({
        //     source: vectorSource,
        // });

        // return vectorLayer;
    }
}