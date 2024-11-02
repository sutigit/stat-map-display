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
import { MapStyle, MapSettings } from './lib/types';

// Enums
import { AdministrativeLevel, Country } from './lib/enums';


export default class OlMap {
    map: Map;
    view: View;
    layer: VectorLayer;
    highlightLayer: VectorLayer;
    selectedLayer: VectorLayer;
    source: VectorSource;

    country: Country | undefined;
    administrativeLevel: AdministrativeLevel | undefined;
    highlight: FeatureLike | undefined;

    style: MapStyle;
    settings: MapSettings;

    selectedFeatures: FeatureLike[];

    constructor() {
        this.map = new Map();
        this.view = new View();
        this.layer = new VectorLayer();
        this.highlightLayer = new VectorLayer();
        this.selectedLayer = new VectorLayer();
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
            highlightStrokeWidth: 0.2,

            selectedStrokeColor: 'rgba(0, 0, 0, 1)',
            selectedFillColor: 'darkblue',
            selectedStrokeWidth: 0.2,

            paddingTop: 60,
            paddingBottom: 60,
            paddingLeft: 60,
            paddingRight: 60
        }

        // Default settings
        this.settings = {
            minZomm: 6,
            maxZoom: 10,
            highlight: true,
            select: true,
            maxSelections: 3
        }

        // Selected features
        this.selectedFeatures = [];
    }

    private setMap(mapId: string) {
        // Set the target HTMLDivElement
        this.map.setTarget(mapId);

        // Remove controls
        this.map.getControls().clear();
    }

    private setLayers(country: Country, level: AdministrativeLevel) {
        // Create source from StatMap
        const vectorMap = new StatMap(country, level);
        this.source.addFeatures(new GeoJSON().readFeatures(vectorMap));

        // Set sources to layers
        this.layer.setSource(this.source);
        this.highlightLayer.setSource(new VectorSource());
        this.selectedLayer.setSource(new VectorSource());

        // Finally add the layers to the map
        this.map.addLayer(this.layer);
        this.map.addLayer(this.highlightLayer);
        this.map.addLayer(this.selectedLayer);
    }

    private setView() {
        // Fit country to the viewport
        this.view.fit(
            this.source.getExtent(),
            {
                size: this.map.getSize(),
                padding: [
                    this.style.paddingTop,
                    this.style.paddingRight,
                    this.style.paddingBottom,
                    this.style.paddingLeft
                ]
            }
        );

        // Set view settings
        this.view.setMinZoom(this.settings.minZomm);
        this.view.setMaxZoom(this.settings.maxZoom);

        // Finally set the view to the map
        this.map.setView(this.view);
    };

    private setLayerStyles() {
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

        // Set selected layer style
        this.selectedLayer.setStyle(new Style({
            fill: new Fill({ color: this.style.selectedFillColor }),
            stroke: this.style.selectedStrokeWidth ? new Stroke({
                color: this.style.selectedStrokeColor,
                width: this.style.selectedStrokeWidth
            }) : undefined
        }));
    };

    private setInteractions() {
        // Add click interaction
        this.settings.select && this.map.on('click', (evt) => {
            this.selectFeature(evt.pixel);
        });

        // Add hover interaction
        this.settings.highlight && this.map.on('pointermove', (evt) => {
            if (evt.dragging) {
                return;
            }
            const pixel = this.map.getEventPixel(evt.originalEvent);
            this.highlightFeature(pixel);
        });
    };

    private selectFeature(pixel: number[]) {
        const feature = this.map.forEachFeatureAtPixel(pixel, function (feature) {
            return feature;
        });

        if (feature) {

            // If feature already selected, remove it
            if (this.selectedFeatures.includes(feature)) {
                this.selectedFeatures = this.selectedFeatures.filter(f => f !== feature);
                this.selectedLayer.getSource()?.removeFeature(feature);
            }
            else if (this.selectedFeatures.length < this.settings.maxSelections) {
                this.selectedFeatures.push(feature);
                this.selectedLayer.getSource()?.addFeature(feature);
            }
        }
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

    create(mapId: string) {
        if (this.country && this.administrativeLevel) {

            this.setMap(mapId);

            this.setLayers(this.country, this.administrativeLevel);

            this.setLayerStyles();
            
            this.setView();

            this.setInteractions();

        } else {
            throw new Error('Country and administrative level must be set before initializing the map');
        }
    }
}