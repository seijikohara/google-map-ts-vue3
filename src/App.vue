<template>
  <GoogleMap
    :apiKey="apiKey"
    libraries="geometry,drawing,places"
    :options="{
      center: { lat: 35.1, lng: 135.1 },
      zoom: 5,
    }"
    :markers="[
      {
        position: { lat: 35.1, lng: 135.1 },
        title: 'position1',
        draggable: false,
      },
      {
        position: { lat: 37.1, lng: 139.1 },
        title: 'position2',
        draggable: false,
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
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        bounds: {
          north: 30,
          south: 33,
          east: 133,
          west: 130,
        },
      },
    ]"
    @map-created="onMapCreated"
    @markers-created="onMarkersCreated"
    @polylines-created="onPolylinesCreated"
    @polygons-created="onPolygonsCreated"
    @circles-created="onCirclesCreated"
    @rectangles-created="onRectanglesCreated"
  />
</template>

<script lang="ts">
/// <reference types="googlemaps" />
/* eslint-disable no-undef */

import { defineComponent } from "vue";

import { GoogleMap } from "./components";

export default defineComponent({
  name: "App",
  components: {
    GoogleMap,
  },
  setup() {
    return {
      apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
      onMapCreated: (map: google.maps.Map) => console.log("map: ", map),
      onMarkersCreated: (markers: google.maps.Marker[]) =>
        console.log("markers: ", markers),
      onPolylinesCreated: (polylines: google.maps.Polyline[]) =>
        console.log("polylines: ", polylines),
      onPolygonsCreated: (polygons: google.maps.Polygon[]) =>
        console.log("polygons: ", polygons),
      onCirclesCreated: (circles: google.maps.Circle[]) =>
        console.log("circles: ", circles),
      onRectanglesCreated: (rectangles: google.maps.Rectangle[]) =>
        console.log("rectangles: ", rectangles),
    };
  },
});
</script>
