# Perequisites
- Node
- Typescript

# Installation
Install it as dependency into your project
```
$ npm install https://github.com/sutigit/stat-map-display.git
```
# Usage
## import 
```
import StatMapDisplay, { Country, AdministrativeLevel, ResolutionLevel } from 'stat-map-display';
```
## Usage
Instantiate the class. See parameter description from [`StatMapDisplay`](#statmapdisplay)

```
const view = new StatMapDisplay({
    id: 'target',
    country: Country.FINLAND,
    administrativeLevel: AdministrativeLevel.MUNICIPALITY,
    resolution: ResolutionLevel.LEVEL_1,
    style: { ... }, // optional
    settings: { ... } // optional
});
```

# Classes
## `StatMapDisplay`
### Description
Instantiates the map display with initial arguments.

| Key | Type | Required | Description |
|-----|------|---------|-------------|
| id | string | yes | Set the value to be the same as the given id of your target div element |
| country | [`Country`](#country) enum | yes | Choose country. See [`Country`](#country) |
| administrativeLevel | [`AdministrativeLevel`](#administrativelevel) enum | yes | Choose the regional devision type. See [`AdministrativeLevel`](#administrativelevel) |
| style | object | no | See [options](#style-options) |
| settings | object | no | See [options](#settings-options) |

# Methods

## `forEachFeature()`
### Description
Get access to all the features and the features corresponding natcode in the map
```
view.forEachFeature((feature: Feature, natcode: string) => {
    // Do things...
})
```

## `getCanvas()`
### Description
Retrieves the canvas element. Note that the canvas element is retrievable only after the map has been instantiated.
```
view.getCanvas()
```

## `getMap()`
### Description
Retrieves the map element. Note that the map element is retrievable only after the map has been instantiated.
```
view.getMap()
```


# Options
## Style options
| Name | Type | Default | Description |
|------|------|---------|-------------|
| backgroundcolor | string | 'lightgrey' | Set the background color for the view |
| fillColor | string | 'lightblue' | Set the fill color of the map features |
| strokeWidth | number | 0.2 | Set the outline stroke width of the map features |
| strokeColor | string | 'darkblue' | Set the outline stroke color of the map features |
| highlightStrokeColor | string | 'rgba(0, 0, 0, 0.7)' | Set the outline stroke color of the highlighted map features |
| highlightFillColor | string | 'blue' | Set the fill color of the highlighted map features |
| highlightStrokeWidth | number |  0.2 | set the outline stroke width of the highlighted map features |
| selectedStrokeColor | string | 'rgba(0, 0, 0, 1)' | Set the outline stroke color of the selected map features |
| selectedFillColor | string | 'darkblue' | Set the fill color of the selected map features |
| selectedStrokeWidth | number | 0.2 | Set the outline stroke color of the selected map features |
| paddingTop | number | 60 | Set the initial minimum distance from top of the screen to the top edge of the country |
| paddingBottom | number | 60 | Set the initial minimum distance from bottom of the screen to the bottom edge of the country |
| paddingLeft | number | 60 | Set the initial minimum distance from left of the screen to the left edge of the country |
| paddingRight | number | 60 | Set the initial minimum distance from right of the screen to the right edge of the country |

## Settings options
| Name | Type | Default | Description |
|------|------|---------|-------------|
| minZoom | number | 6 | The minimum zoom level in [openlayers](#https://openlayers.org/) standard |
| maxZoom | number | 10 | The maximum zoom level in [openlayers](#https://openlayers.org/) standard |
| highlight | boolean | true | Set the map features to be highlightable |
| select | boolean | true | Set the map features to be selectable |
| maxSelections | number | 3 | The max number of selectable features in the map |

# Enums
## `Country`
```
import { Country } from 'stat-map-display'

console.log(Country.FINLAND)
// -> FINLAND
```
### Country options
| Name | Value |
|------|-------|
| FINLAND | 'FINLAND' |### Options

## `AdministrativeLevel`
```
import { AdministrativeLevel } from 'stat-map-display'

console.log(AdministrativeLevel.MUNICIPALITY)
// -> MUNICIPALITY
```

### Administrative level options
| Name | Value |
|------|-------|
| MUNICIPALITY | 'MUNICIPALITY' |
| PROVINCE | 'PROVINCE' |


## `ResolutionLevel`
```
import { ResolutionLevel } from 'stat-map-display'

console.log(ResolutionLevel.LEVEL_1)
// -> 1
```

### Resolution level options
| Name | Value |
|------|-------|
| LEVEL_1 | 1 |
| LEVEL_2 | 2 |

