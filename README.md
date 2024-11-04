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
import StatMapDisplay, { Country, AdministrativeLevel } from 'stat-map-display';
```
## Usage
Instantiate the class. See parameter description from [`StatMapDisplay`](#statmapdisplay)

```
const view = new StatMapDisplay({
    id: 'target',
    country: Country.FINLAND,
    administrativeLevel: AdministrativeLevel.MUNICIPALITY,
    style: { ... }, // optional
    settings: { ... } // optional
});
```

You can update styles and settings anytime later. See [methods](#methods) descriptions.
```

view.updateStyle({
    ...
})

view.updateSettings([
    ...
])
```

# Classes
## `StatMapDisplay`
### Description
Instantiates the map display with initial arguments.

| key | type | required | description |
|-----|------|---------|-------------|
| id | string | yes | Set the value to be the same as the given id of your target div element |
| country | [`Country`](#country) enum | yes | Choose country. See [`Country`](#country) |
| administrativeLevel | [`AdministrativeLevel`](#administrativelevel) enum | yes | Choose the regional devision type. See [`AdministrativeLevel`](#administrativelevel) |
| style | object | no | See [options](#style-options) |
| settings | object | no | See [options](#settings-options) |

# Methods
## `updateStyle()`
### Description
Updates new styling of the map view. See [options](#style-options) below.
```
view.updateStyle({
    backgroundColor: '#fefefe',
    ...    
})
```

## `updateSettings()`
### Description
Update your new preferred settings for the map view. See [options](#settings-options) below.
```
view.updateSettings({
    minZoom: 10,
    ...
})
```


# Options
## Style options
| Name | Value Type | Default |
|------|------------|---------|
| backgroundcolor | string | 'lightgrey' |
| fillColor | string | 'lightblue' |
| strokeWidth | number | 0.2 |
| strokeColor | string | 'darkblue' |
| highlightStrokeColor | string | 'rgba(0, 0, 0, 0.7)' |
| highlightFillColor | string | 'blue' |
| highlightStrokeWidth | number |  0.2 |
| selectedStrokeColor | string | 'rgba(0, 0, 0, 1)' |
| selectedFillColor | string | 'darkblue' |
| selectedStrokeWidth | number | 0.2 |
| paddingTop | number | 60 |
| paddingBottom | number | 60 |
| paddingLeft | number | 60 |
| paddingRight | number | 60 |

## Settings options
| Name | Value Type | Default |
|------|------------|---------|
| minZoom | number | 6 |
| maxZoom | number | 10 |
| highlight | boolean | true |
| select | boolean | true |
| maxSelections | number | 3 |

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
