// Create a div element with id 'target' to attach the map to
import './style.css';
const container = document.createElement('div');
container.id = 'target';
container.style.width = '100%';
container.style.height = '100%';
document.querySelector<HTMLDivElement>('#app')!.appendChild(container)


// EXAMPLES

// Example: Importing the class --------------------------------------------------------
import StatMapDisplay, { Country, AdministrativeLevel } from './main';
import { ResolutionLevel } from 'stat-map-provider';


// Example: Instantiating the class -----------------------------------------------------
const view = new StatMapDisplay({
    id: 'target',
    country: Country.FINLAND,
    administrativeLevel: AdministrativeLevel.MUNICIPALITY,
    resolution: ResolutionLevel.LEVEL_1,
});

// Example: Getting the canvas element -------------------------------------------------
const button = document.createElement('button');
button.innerText = 'Get Canvas';
button.style.position = 'absolute';
button.style.top = '10px';
button.style.right = '10px';
document.querySelector<HTMLDivElement>('#app')!.appendChild(button);

// Note: the canvas element is not available until the map is rendered
button.addEventListener('click', () => {
    const canvas = view.getCanvas();
    if (canvas) {
        console.log(view.getCanvas());
    }
    else {
        console.log('Canvas not found');
    }
});

// Example: Animating map features -----------------------------------------------------
const svgButton = document.createElement('button');
svgButton.innerText = 'SVG';
svgButton.style.position = 'absolute';
svgButton.style.top = '60px';
svgButton.style.right = '10px';
document.querySelector<HTMLDivElement>('#app')!.appendChild(svgButton);


// const downloadLink = document.createElement('a');
// downloadLink.href = URL.createObjectURL(svgBlob);
// downloadLink.download = 'map_export.svg';
// downloadLink.click();

svgButton.addEventListener('click', () => {
    const svg = view.getMapSVG();
    if (svg) {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(svg);
        downloadLink.download = 'map_export.svg';
        downloadLink.click();
    }
    else {
        console.log('SVG not found');
    }
});