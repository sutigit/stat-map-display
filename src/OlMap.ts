// Open layers
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { FeatureLike } from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON'
import Style from 'ol/style/Style';
import { Fill, Stroke } from 'ol/style';

// Map provider
import StatMap from 'stat-map-provider';

// Definitions
import { AdministrativeLevel, Country } from 'stat-map-provider';
import { MapStyle } from './lib/types';

export default class OlMap {
    map: Map;
    view: View;
    layer: VectorLayer;
    highlightLayer: VectorLayer;
    source: VectorSource;

    country: Country | undefined;
    administrativeLevel: AdministrativeLevel | undefined;
    highlight: FeatureLike | undefined;

    style: MapStyle;

    constructor() {
        this.map = new Map();
        this.view = new View();
        this.layer = new VectorLayer();
        this.highlightLayer = new VectorLayer();
        this.source = new VectorSource();

        this.country = undefined;
        this.administrativeLevel = undefined;
        this.highlight = undefined;

        // Default style
        this.style = {
            backgroundColor: 'lightgrey',
            fillColor: 'lightblue',
            strokeWidth: 0.2,
            strokeColor: 'darkblue',
            highlightStrokeColor: 'rgba(0, 0, 0, 0.7)',
            highlightFillColor: 'blue',
            highlightStrokeWidth: 0.2
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

        // Create source from features from GeoJSON
        const vectorMap = new StatMap(this.country, this.administrativeLevel);
        this.source.addFeatures(new GeoJSON().readFeatures(vectorMap));

        // Set basic layer source
        this.layer.setSource(this.source);

        // Set empty source for highlight layer for interactions
        this.highlightLayer.setSource(new VectorSource());

        // Add the layers to the map
        this.map.addLayer(this.layer);
        this.map.addLayer(this.highlightLayer);

        // Set the view
        this.map.setView(this.view);

        // Fit country to the viewport
        const extent = this.source.getExtent();
        this.view.fit(extent, { size: this.map.getSize(), padding: [60, 60, 60, 60] });

        // Set basic layer style
        this.layer.setBackground(this.style.backgroundColor);
        this.layer.setStyle(new Style({
            fill: new Fill({ color: this.style.fillColor }),
            stroke: this.style.strokeWidth ? new Stroke({
                color: this.style.strokeColor,
                width: this.style.strokeWidth
            }) : undefined
        }));

        // Set highlight layer style
        this.highlightLayer.setStyle(new Style({
            fill: new Fill({ color: this.style.highlightFillColor }),
            stroke: this.style.highlightStrokeWidth ? new Stroke({
                color: this.style.highlightStrokeColor,
                width: this.style.highlightStrokeWidth
            }) : undefined
        }));

        // Add click interaction
        this.map.on('click', (evt) => {
            this.highlightFeature(evt.pixel);
        });

        // Add hover interaction
        this.map.on('pointermove', (evt) => {
            if (evt.dragging) {
                return;
            }
            const pixel = this.map.getEventPixel(evt.originalEvent);
            this.highlightFeature(pixel);
        });
    }


    private highlightFeature(pixel: number[]) {
        const feature = this.map.forEachFeatureAtPixel(pixel, function (feature) {
            return feature;
        });


        if (feature !== this.highlight) {
            if (this.highlight) {
                this.highlightLayer.getSource()?.removeFeature(this.highlight);
            }
            if (feature) {
                this.highlightLayer.getSource()?.addFeature(feature);
            }
            
            this.highlight = feature;
        }
    }
}