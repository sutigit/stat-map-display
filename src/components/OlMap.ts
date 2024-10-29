
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';


export default class OlMap {
    map: Map;
    view: View;
    layer: TileLayer;

    constructor() {
        this.map = new Map();
        this.view = new View({
            center: [0, 0],
            zoom: 2,
        });
        this.layer = new TileLayer({ source: new OSM() });
    }

    init(mapId: string) {
        this.map.setTarget(mapId);
        this.map.addLayer(this.layer);
        this.map.setView(this.view);
    }
}