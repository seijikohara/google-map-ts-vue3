# google-map-ts-vue3

[![npm version](https://img.shields.io/npm/v/google-map-ts-vue3.svg)](https://www.npmjs.com/package/google-map-ts-vue3)
[![CI](https://img.shields.io/github/actions/workflow/status/seijikohara/google-map-ts-vue3/npm-ci.yml?branch=main&label=CI)](https://github.com/seijikohara/google-map-ts-vue3/actions/workflows/npm-ci.yml)
[![E2E Tests](https://img.shields.io/github/actions/workflow/status/seijikohara/google-map-ts-vue3/playwright.yml?branch=main&label=E2E)](https://github.com/seijikohara/google-map-ts-vue3/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Vue 3 component for integrating Google Maps with full TypeScript support.

This library provides a declarative interface for rendering Google Maps with markers, polylines, polygons, circles, and rectangles, utilizing the latest Google Maps JavaScript API features including Advanced Markers.

## Installation

```bash
npm install google-map-ts-vue3
```

## Usage

### Basic Example

```vue
<script setup lang="ts">
import { GoogleMap } from "google-map-ts-vue3";
</script>

<template>
  <GoogleMap
    apiKey="YOUR_GOOGLE_MAPS_API_KEY"
    :options="{
      center: { lat: 35.1, lng: 135.1 },
      zoom: 5,
      mapId: 'DEMO_MAP_ID'
    }"
  />
</template>
```

### Complete Example with Overlays

```vue
<script setup lang="ts">
import { GoogleMap } from "google-map-ts-vue3";
</script>

<template>
  <GoogleMap
    apiKey="YOUR_GOOGLE_MAPS_API_KEY"
    :options="{
      center: { lat: 35.1, lng: 135.1 },
      zoom: 5,
      mapId: 'DEMO_MAP_ID'
    }"
    :markers="[
      {
        position: { lat: 35.1, lng: 135.1 },
        title: 'Location 1'
      },
      {
        position: { lat: 37.1, lng: 139.1 },
        title: 'Location 2'
      }
    ]"
    :polylines="[
      {
        path: [
          { lat: 35.1, lng: 135.1 },
          { lat: 37.1, lng: 139.1 }
        ],
        geodesic: true,
        strokeColor: '#ff0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      }
    ]"
    :polygons="[
      {
        paths: [
          { lat: 30, lng: 140 },
          { lat: 31, lng: 141 },
          { lat: 30, lng: 145 },
          { lat: 33, lng: 140 }
        ],
        strokeColor: '#ff0000',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#ff0000',
        fillOpacity: 0.35
      }
    ]"
    :circles="[
      {
        center: { lat: 39.1, lng: 140.1 },
        radius: 100000,
        strokeColor: '#ff0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ff0000',
        fillOpacity: 0.35
      }
    ]"
    :rectangles="[
      {
        bounds: {
          north: 30,
          south: 33,
          east: 133,
          west: 130
        },
        strokeColor: '#ff0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ff0000',
        fillOpacity: 0.35
      }
    ]"
  />
</template>
```

## API Reference

### Props

| Property               | Type                                                | Required | Default                          | Description                                                                                                                                               |
|------------------------|-----------------------------------------------------|----------|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `apiKey`               | `string`                                            | Yes      | -                                | Google Maps API key. Obtain from [Google Cloud Console](https://developers.google.com/maps/documentation/javascript/get-api-key)                         |
| `options`              | `google.maps.MapOptions`                            | Yes      | -                                | Map configuration options. See [MapOptions](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)                         |
| `markers`              | `google.maps.marker.AdvancedMarkerElementOptions[]` | No       | `[]`                             | Array of advanced marker configurations. See [AdvancedMarkerElementOptions](https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions) |
| `polylines`            | `google.maps.PolylineOptions[]`                     | No       | `[]`                             | Array of polyline configurations. See [PolylineOptions](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions)    |
| `polygons`             | `google.maps.PolygonOptions[]`                      | No       | `[]`                             | Array of polygon configurations. See [PolygonOptions](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions)       |
| `circles`              | `google.maps.CircleOptions[]`                       | No       | `[]`                             | Array of circle configurations. See [CircleOptions](https://developers.google.com/maps/documentation/javascript/reference/polygon#CircleOptions)          |
| `rectangles`           | `google.maps.RectangleOptions[]`                    | No       | `[]`                             | Array of rectangle configurations. See [RectangleOptions](https://developers.google.com/maps/documentation/javascript/reference/polygon#RectangleOptions) |
| `height`               | `string`                                            | No       | `"500px"`                        | Height of the map container                                                                                                                               |
| `width`                | `string`                                            | No       | `"500px"`                        | Width of the map container                                                                                                                                |
| `libraries`            | `string`                                            | No       | `"marker,geometry,drawing,places"` | Comma-separated list of Google Maps libraries to load. See [Libraries](https://developers.google.com/maps/documentation/javascript/libraries)            |
| `scriptLoadingTimeout` | `number`                                            | No       | `5000`                           | Timeout in milliseconds for loading the Google Maps JavaScript API                                                                                        |

### Events

The component emits the following events when Google Maps objects are created, providing access to the underlying API instances:

| Event                | Payload Type                                                                                                                                      | Description                                  |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------|
| `map-created`        | [`google.maps.Map`](https://developers.google.com/maps/documentation/javascript/reference/map#Map)                                                | Emitted when the map instance is created     |
| `markers-created`    | [`google.maps.marker.AdvancedMarkerElement[]`](https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElement) | Emitted when marker instances are created    |
| `polylines-created`  | [`google.maps.Polyline[]`](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline)                                | Emitted when polyline instances are created  |
| `polygons-created`   | [`google.maps.Polygon[]`](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon)                                  | Emitted when polygon instances are created   |
| `circles-created`    | [`google.maps.Circle[]`](https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle)                                    | Emitted when circle instances are created    |
| `rectangles-created` | [`google.maps.Rectangle[]`](https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle)                              | Emitted when rectangle instances are created |

### Event Usage Example

```vue
<script setup lang="ts">
import { GoogleMap } from "google-map-ts-vue3";

const handleMapCreated = (map: google.maps.Map) => {
  console.log("Map instance:", map);
};

const handleMarkersCreated = (markers: google.maps.marker.AdvancedMarkerElement[]) => {
  console.log("Marker instances:", markers);
};
</script>

<template>
  <GoogleMap
    apiKey="YOUR_GOOGLE_MAPS_API_KEY"
    :options="{ center: { lat: 35.1, lng: 135.1 }, zoom: 5, mapId: 'DEMO_MAP_ID' }"
    :markers="[{ position: { lat: 35.1, lng: 135.1 }, title: 'Marker' }]"
    @map-created="handleMapCreated"
    @markers-created="handleMarkersCreated"
  />
</template>
```

## Important Notes

### Map ID Requirement

The `mapId` property is **required** in `options` when using Advanced Markers (the default marker type). Create a Map ID in the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/studio/maps).

### TypeScript Support

This library includes full TypeScript type definitions from `@types/google.maps`, providing comprehensive type safety and IDE autocomplete for all Google Maps API features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
