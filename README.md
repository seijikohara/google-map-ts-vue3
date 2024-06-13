# google-map-ts-vue3

[![npm version](https://badge.fury.io/js/google-map-ts-vue3.svg)](https://www.npmjs.com/package/google-map-ts-vue3) [![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Google Maps component implemented in Vue3.

## Example

```vue
<script setup lang="ts">
import { GoogleMap } from "google-map-ts-vue3";
</script>

<template>
  <GoogleMap
    apiKey="your google maps api key"
    :options="{
      center: { lat: 35.1, lng: 135.1 },
      zoom: 5,
      mapId: 'DEMO_MAP_ID' // Map ID is required for advanced markers.
    }"
    :markers="[
    {
        position: { lat: 35.1, lng: 135.1 },
        title: 'position1'
      },
      {
        position: { lat: 37.1, lng: 139.1 },
        title: 'position2'
      },
    ]"
    :polylines="[
      {
        path: [
          { lat: 35.1, lng: 135.1 },
          { lat: 37.1, lng: 139.1 },
        ],
        geodesic: true,
        strokeColor: '#ff0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      },
      {
        path: [
          { lat: 38.1, lng: 136.1 },
          { lat: 34.1, lng: 135.1 },
          { lat: 37.1, lng: 139.1 },
        ],
        geodesic: true,
        strokeColor: '#ffffff',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      },
    ]"
    :polygons="[
      {
        paths: [
          { lat: 30, lng: 140 },
          { lat: 31, lng: 141 },
          { lat: 30, lng: 145 },
          { lat: 33, lng: 140 },
        ],
        strokeColor: '#ff0000',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#ff0000',
        fillOpacity: 0.35,
      },
    ]"
    :circles="[
      {
        strokeColor: '#ff0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ff0000',
        fillOpacity: 0.35,
        center: { lat: 39.1, lng: 140.1 },
        radius: 100000,
      },
    ]"
    :rectangles="[
      {
        strokeColor: '#ff0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ff0000',
        fillOpacity: 0.35,
        bounds: {
          north: 30,
          south: 33,
          east: 133,
          west: 130,
        },
      },
    ]"
  />
</template>
```

## Props

| Props                | Required | Param Type                                        | Default value                    | Description                                                                                                                                                |
|----------------------|----------|---------------------------------------------------|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| apiKey               | TRUE     | string                                            |                                  | [Google Maps  API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)                                                            |
| scriptLoadingTimeout | FALSE    | number                                            | 5000                             | Timeout for loading the Google Map script                                                                                                                  |
| libraries            | FALSE    | string                                            | "marker,geometry,drawing,places" | [Libraries to load](https://developers.google.com/maps/documentation/javascript/libraries)                                                                 |
| height               | FALSE    | string                                            | "500px"                          | The height of Google Maps                                                                                                                                  |
| width                | FALSE    | string                                            | "500px"                          | The width of Google Maps                                                                                                                                   |
| options              | TRUE     | google.maps.MapOptions                            |                                  | [MapOptions object](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)                                                  |
| markers              | FALSE    | google.maps.marker.AdvancedMarkerElementOptions[] | []                               | [AdvancedMarkerElementOptions object](https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions) |
| polylines            | FALSE    | google.maps.PolylineOptions[]                     | []                               | [PolylineOptions object](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions)                                    |
| polygons             | FALSE    | google.maps.PolygonOptions[]                      | []                               | [PolygonOptions object](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions)                                      |
| circles              | FALSE    | google.maps.CircleOptions[]                       | []                               | [CircleOptions object](https://developers.google.com/maps/documentation/javascript/reference/polygon#CircleOptions)                                        |
| rectangles           | FALSE    | google.maps.RectangleOptions[]                    | []                               | [RectangleOptions object](https://developers.google.com/maps/documentation/javascript/reference/polygon#RectangleOptions)                                  |

## Events

- map-created(map: [google.maps.Map](https://developers.google.com/maps/documentation/javascript/reference/map#Map))
- markers-created(markers: [google.maps.marker.AdvancedMarkerElement[]](https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElement))
- polylines-created(polylines: [google.maps.Polyline[]](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline))
- polygons-created(polygons: [google.maps.Polygon[]](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon))
- circles-created(circles: [google.maps.Circle[]](https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle))
- rectangles-created(rectangles: [google.maps.Rectangle[]](https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle))
