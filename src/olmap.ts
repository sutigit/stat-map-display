// Open layers
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { FeatureLike } from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON'
import Style from 'ol/style/Style';
import { Fill, Stroke } from 'ol/style';
import RenderEvent from 'ol/render/Event';

// Map provider
import StatMap from 'stat-map-provider';

// Definitions
import { MapStyle, MapSettings } from './lib/types';

// Enums
import { AdministrativeLevel, Country, ResolutionLevel } from 'stat-map-provider';


export default class OlMap {
    private id: string;
    private country: Country;
    private administrativeLevel: AdministrativeLevel;
    private resolution: ResolutionLevel;
    private style: MapStyle;
    private settings: MapSettings;

    private map: Map;
    private view: View;

    private featureSource: VectorSource;
    private highlightSource: VectorSource;
    private selectedSource: VectorSource;

    private featureLayer: VectorLayer;
    private highlightLayer: VectorLayer;
    private selectedLayer: VectorLayer;

    private featureStyles: Style;
    private highlightStyles: Style;
    private selectedStyles: Style;

    private highlight: FeatureLike | undefined;
    private selectedFeatures: FeatureLike[];
    private canvas: HTMLCanvasElement | undefined;

    constructor(
        id: string,
        country: Country,
        administrativeLevel: AdministrativeLevel,
        resolution: ResolutionLevel,
        style: MapStyle,
        settings: MapSettings
    ) {
        this.id = id;
        this.country = country;
        this.administrativeLevel = administrativeLevel;
        this.resolution = resolution;
        this.style = style;
        this.settings = settings;

        this.canvas = undefined;

        this.map = new Map();
        this.view = new View();

        this.featureSource = new VectorSource();
        this.highlightSource = new VectorSource();
        this.selectedSource = new VectorSource();

        this.featureLayer = new VectorLayer();
        this.highlightLayer = new VectorLayer();
        this.selectedLayer = new VectorLayer();

        this.featureStyles = new Style()
        this.highlightStyles = new Style()
        this.selectedStyles = new Style()

        this.featureStyles = new Style()

        this.highlight = undefined;

        // Selected features
        this.selectedFeatures = [];
    }

    private setMap() {
        // Set the target HTMLDivElement
        this.map.setTarget(this.id);

        // Remove controls
        this.map.getControls().clear();
    }

    private setFeatures() {
        // Create source from StatMap
        const vectorMap = new StatMap(this.country, this.administrativeLevel, this.resolution);
        this.featureSource.addFeatures(new GeoJSON().readFeatures(vectorMap));
    }

    private setLayers() {
        // Set sources to layers
        this.featureLayer.setSource(this.featureSource);
        this.highlightLayer.setSource(this.highlightSource);
        this.selectedLayer.setSource(this.selectedSource);

        // Finally add the layers to the map
        this.map.addLayer(this.featureLayer);
        this.map.addLayer(this.highlightLayer);
        this.map.addLayer(this.selectedLayer);
    }

    private setStyles() {
        // Set initial background style to the feature layer
        // to prevent background flicker whn updating canvas background
        this.featureLayer.setBackground(this.style.backgroundColor);

        // Set feature styles
        this.featureStyles.setFill(new Fill({ color: this.style.fillColor }));
        this.featureStyles.setStroke(this.style.strokeWidth ? new Stroke({
            color: this.style.strokeColor,
            width: this.style.strokeWidth
        }) : null);

        // Set highlight styles
        this.highlightStyles.setFill(new Fill({ color: this.style.highlightFillColor }));
        this.highlightStyles.setStroke(this.style.highlightStrokeWidth ? new Stroke({
            color: this.style.highlightStrokeColor,
            width: this.style.highlightStrokeWidth
        }) : null);

        // Set selected styles
        this.selectedStyles.setFill(new Fill({ color: this.style.selectedFillColor }));
        this.selectedStyles.setStroke(this.style.selectedStrokeWidth ? new Stroke({
            color: this.style.selectedStrokeColor,
            width: this.style.selectedStrokeWidth
        }) : null);
    }

    private setLayerStyles() {
        // Set styles to layers
        this.featureLayer.setStyle(this.featureStyles);
        this.highlightLayer.setStyle(this.highlightStyles);
        this.selectedLayer.setStyle(this.selectedStyles);
    };

    private setView() {
        // Fit country to the viewport
        this.view.fit(
            this.featureSource.getExtent(),
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
        this.view.setMinZoom(this.settings.minZoom);
        this.view.setMaxZoom(this.settings.maxZoom);

        // Finally set the view to the map
        this.map.setView(this.view);
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

    private setCanvas() {
        this.map.on('rendercomplete', (event: RenderEvent) => {
            // Get canvas element
            this.canvas = event.target.viewport_.querySelector('canvas');

            // Set background color
            if (this.canvas) {
                this.canvas.style.backgroundColor = this.style.backgroundColor;
            }
        });
    }

    updateStyles(newStyle: MapStyle) {
        // update background
        if (this.style.backgroundColor !== newStyle.backgroundColor) {

            // update featureLayer background color to prevent flicker
            // when updating canvas background
            this.featureLayer.setBackground(newStyle.backgroundColor);

            if (this.canvas) {
                this.canvas.style.backgroundColor = newStyle.backgroundColor;
            }
        }

        // update feature styles
        if (this.style.fillColor !== newStyle.fillColor) {
            this.featureStyles.setFill(new Fill({ color: newStyle.fillColor }));
        }
        if (this.style.strokeColor !== newStyle.strokeColor || this.style.strokeWidth !== newStyle.strokeWidth) {
            this.featureStyles.setStroke(newStyle.strokeWidth ? new Stroke({
                color: newStyle.strokeColor,
                width: newStyle.strokeWidth
            }) : null);
        }

        // update highlight styles
        if (this.style.highlightFillColor !== newStyle.highlightFillColor) {
            this.highlightStyles.setFill(new Fill({ color: newStyle.highlightFillColor }));
        }
        if (this.style.highlightStrokeColor !== newStyle.highlightStrokeColor || this.style.highlightStrokeWidth !== newStyle.highlightStrokeWidth) {
            this.highlightStyles.setStroke(newStyle.highlightStrokeWidth ? new Stroke({
                color: newStyle.highlightStrokeColor,
                width: newStyle.highlightStrokeWidth
            }) : null);
        }

        // update selected styles
        if (this.style.selectedFillColor !== newStyle.selectedFillColor) {
            this.selectedStyles.setFill(new Fill({ color: newStyle.selectedFillColor }));
        }
        if (this.style.selectedStrokeColor !== newStyle.selectedStrokeColor || this.style.selectedStrokeWidth !== newStyle.selectedStrokeWidth) {
            this.selectedStyles.setStroke(newStyle.selectedStrokeWidth ? new Stroke({
                color: newStyle.selectedStrokeColor,
                width: newStyle.selectedStrokeWidth
            }) : null);
        }

        this.style = newStyle;
    }

    updateSettings(newSettings: MapSettings) {
        // update view settings
        if (this.settings.minZoom !== newSettings.minZoom) {
            this.settings.minZoom = newSettings.minZoom;
            this.view.setMinZoom(newSettings.minZoom);
        }
        if (this.settings.maxZoom !== newSettings.maxZoom) {
            this.settings.maxZoom = newSettings.maxZoom;
            this.view.setMaxZoom(newSettings.maxZoom);
        }

        // update rest
        this.settings = newSettings;
    }

    /**
     * Returns the canvas element created by OpenLayers.
     * @returns canvas element of the map
     */
    getCanvas() {
        return this.canvas;
    }

    /**
     * Returns the map element created by OpenLayers.
     * @returns openlayers map element
     */
    getMap() {
        return this.map;
    }


    init() {
        this.setMap();
        this.setFeatures();
        this.setLayers();
        this.setStyles();
        this.setLayerStyles();
        this.setView();
        this.setInteractions();
        this.setCanvas();
    }
}