<template>
  <GoogleMap
    :apiKey="apiKey"
    libraries="geometry,drawing,places"
    :options="mapProps.options"
    :markers="mapProps.markers"
    :polylines="mapProps.polylines"
    :polygons="mapProps.polygons"
    :circles="mapProps.circles"
    :rectangles="mapProps.rectangles"
    @map-created="onMapCreated"
    @markers-created="onMarkersCreated"
    @polylines-created="onPolylinesCreated"
    @polygons-created="onPolygonsCreated"
    @circles-created="onCirclesCreated"
    @rectangles-created="onRectanglesCreated"
  />
  <label>
    <input type="checkbox" v-model="visibles.markers" />
    Markers
  </label>
  <label>
    <input type="checkbox" v-model="visibles.polylines" />
    Polylines
  </label>
  <label>
    <input type="checkbox" v-model="visibles.polygons" />
    Polygons
  </label>
  <label>
    <input type="checkbox" v-model="visibles.circles" />
    Circles
  </label>
  <label>
    <input type="checkbox" v-model="visibles.rectangles" />
    Rectangles
  </label>
</template>

<script lang="ts">
/// <reference types="googlemaps" />
/* eslint-disable no-undef */

import { defineComponent, reactive, watch } from "vue";

import { GoogleMap } from "./components";

export default defineComponent({
  name: "App",
  components: {
    GoogleMap,
  },
  setup() {
    const options = {
      center: { lat: 35.1, lng: 135.1 },
      zoom: 5,
    };
    const markers = [
      {
        position: { lat: 35.1, lng: 135.1 },
        title: "position1",
        draggable: false,
      },
      {
        position: { lat: 37.1, lng: 139.1 },
        title: "position2",
        draggable: false,
      },
    ];
    const polylines = [
      {
        path: [
          { lat: 35.1, lng: 135.1 },
          { lat: 37.1, lng: 139.1 },
        ],
        geodesic: true,
        strokeColor: "#ff0000",
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
        strokeColor: "#ffffff",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      },
    ];
    const polygons = [
      {
        paths: [
          { lat: 30, lng: 140 },
          { lat: 31, lng: 141 },
          { lat: 30, lng: 145 },
          { lat: 33, lng: 140 },
        ],
        strokeColor: "#ff0000",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: "#ff0000",
        fillOpacity: 0.35,
      },
    ];
    const circles = [
      {
        strokeColor: "#ff0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#ff0000",
        fillOpacity: 0.35,
        center: { lat: 39.1, lng: 140.1 },
        radius: 100000,
      },
    ];
    const rectangles = [
      {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        bounds: {
          north: 30,
          south: 33,
          east: 133,
          west: 130,
        },
      },
    ];

    const mapProps = reactive({
      options,
      markers,
      polylines,
      polygons,
      circles,
      rectangles,
    });

    const visibles = reactive({
      markers: true,
      polylines: true,
      polygons: true,
      circles: true,
      rectangles: true,
    });

    watch(
      () => visibles.markers,
      (value) => (mapProps.markers = value ? markers : [])
    );
    watch(
      () => visibles.polylines,
      (value) => (mapProps.polylines = value ? polylines : [])
    );
    watch(
      () => visibles.polygons,
      (value) => (mapProps.polygons = value ? polygons : [])
    );
    watch(
      () => visibles.circles,
      (value) => (mapProps.circles = value ? circles : [])
    );
    watch(
      () => visibles.rectangles,
      (value) => (mapProps.rectangles = value ? rectangles : [])
    );

    return {
      mapProps,
      visibles,
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
