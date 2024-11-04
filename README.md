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
```
// 0. Create an instance with the target div id
const view = new StatMapDisplay('target');

// 1. Set the country [fin]
view.setCountry(Country.FINLAND);

// 2. Set the administrative level ['municipality', 'province']
view.setAdministrativeLevel(AdministrativeLevel.MUNICIPALITY);

// 3. Add stylings (optional)
// view.setStyle({ ... });

// 4. Add settings (optional)
// view.setSettings({ ... });

// 5. Initialize it
view.init();
```

# Classes
## `StatMapDisplay`
### Description
Instantiates the map display. Takes a string as an argument that is the id of your parent HTMLDivElement. The display will attach to that HTML element.
```
@params: id of an HTMLDivElement as a string

const view = new StatMapDisplay(id='target');
```


# Methods
## `init()`
### Description
Creates the map display and mounts it to the HTMLDivElement which id was given to the class constructor. Needs to be called last, after setting all preferences below.
```
const view = new StatMapDisplay('target');

// Settings ...

view.init();
```

## `setCountry()`
### Description
Sets the country to be displayed in the view. Takes in an option from the enum `Country` as an argument. Call this before init().
```
view.setCountry(Country.FINLAND);
```

## `setAdministrativeLevel()`
### Description
Sets the administration level of the regional divisions to be displayed in the view. Takes in an option from the enum `AdministrativeLevel` as an argument. Call this before init().
```
view.setAdministrativeLevel(AdministrativeLevel.MUNICIPALITY);
```

## `setStyle()`
### Description
Sets the styling of the map view. See options
```
view.setStyle({
    backgroundColor: '#fefefe',
    ...    
})
```
### Options
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

## `setSettings()`
### Description
Set your preferred settings for the map view. See options
```
view.setSettings({
    minZoom: 10,
    ...
})
```
### Options
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
### Options
| Name | Value |
|------|-------|
| FINLAND | 'FINLAND' |### Options

## `AdministrativeLevel`
```
import { AdministrativeLevel } from 'stat-map-display'

console.log(AdministrativeLevel.MUNICIPALITY)
// -> MUNICIPALITY
```

### Options
| Name | Value |
|------|-------|
| MUNICIPALITY | 'MUNICIPALITY' |
| PROVINCE | 'PROVINCE' |
