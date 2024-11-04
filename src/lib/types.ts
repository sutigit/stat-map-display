interface MapStyle {

    // Background color
    backgroundColor: string;
    
    // Feature colors
    fillColor: string;
    strokeWidth: number;
    strokeColor: string;

    // Feature highlighting
    highlightStrokeColor: string;
    highlightFillColor: string;
    highlightStrokeWidth: number;

    // Feature selected
    selectedStrokeColor: string;
    selectedFillColor: string;
    selectedStrokeWidth: number;

    // Padding
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
}

interface MapSettings {
    minZoom: number;
    maxZoom: number;
    highlight: boolean;
    select: boolean;
    maxSelections: number;
}

export type { MapStyle, MapSettings };