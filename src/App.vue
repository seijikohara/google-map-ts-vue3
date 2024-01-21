<script setup lang="ts">
/// <reference types="google.maps" />

import { reactive, watch } from 'vue'

import { GoogleMap } from './components'

defineOptions({
  name: 'App'
})

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const options = {
  center: { lat: 35.1, lng: 135.1 },
  zoom: 5
} as google.maps.MapOptions
const markers = [
  {
    position: { lat: 35.1, lng: 135.1 },
    title: 'position1',
    draggable: false
  },
  {
    position: { lat: 37.1, lng: 139.1 },
    title: 'position2',
    draggable: false
  }
] as google.maps.MarkerOptions[]
const polylines = [
  {
    path: [
      { lat: 35.1, lng: 135.1 },
      { lat: 37.1, lng: 139.1 }
    ],
    geodesic: true,
    strokeColor: '#ff0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  },
  {
    path: [
      { lat: 38.1, lng: 136.1 },
      { lat: 34.1, lng: 135.1 },
      { lat: 37.1, lng: 139.1 }
    ],
    geodesic: true,
    strokeColor: '#ffffff',
    strokeOpacity: 1.0,
    strokeWeight: 2
  }
] as google.maps.PolylineOptions[]
const polygons = [
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
] as google.maps.PolygonOptions[]
const circles = [
  {
    strokeColor: '#ff0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#ff0000',
    fillOpacity: 0.35,
    center: { lat: 39.1, lng: 140.1 },
    radius: 100000
  }
] as google.maps.CircleOptions[]
const rectangles = [
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
      west: 130
    }
  }
] as google.maps.RectangleOptions[]

const state = reactive({
  options,
  markers: {
    props: markers,
    visible: true
  },
  polylines: {
    props: polylines,
    visible: true
  },
  polygons: {
    props: polygons,
    visible: true
  },
  circles: {
    props: circles,
    visible: true
  },
  rectangles: {
    props: rectangles,
    visible: true
  }
})

watch(
  () => state.markers.visible,
  (value) => (state.markers.props = value ? markers : [])
)
watch(
  () => state.polylines.visible,
  (value) => (state.polylines.props = value ? polylines : [])
)
watch(
  () => state.polygons.visible,
  (value) => (state.polygons.props = value ? polygons : [])
)
watch(
  () => state.circles.visible,
  (value) => (state.circles.props = value ? circles : [])
)
watch(
  () => state.rectangles.visible,
  (value) => (state.rectangles.props = value ? rectangles : [])
)

const onMapCreated = (map: google.maps.Map) => console.log('map: ', map)
const onMarkersCreated = (markers: google.maps.Marker[]) => console.log('markers: ', markers)
const onPolylinesCreated = (polylines: google.maps.Polyline[]) =>
  console.log('polylines: ', polylines)
const onPolygonsCreated = (polygons: google.maps.Polygon[]) => console.log('polygons: ', polygons)
const onCirclesCreated = (circles: google.maps.Circle[]) => console.log('circles: ', circles)
const onRectanglesCreated = (rectangles: google.maps.Rectangle[]) =>
  console.log('rectangles: ', rectangles)
</script>

<template>
  <GoogleMap
    :apiKey="apiKey"
    libraries="geometry,drawing,places"
    :options="state.options"
    :markers="state.markers.props"
    :polylines="state.polylines.props"
    :polygons="state.polygons.props"
    :circles="state.circles.props"
    :rectangles="state.rectangles.props"
    @map-created="onMapCreated"
    @markers-created="onMarkersCreated"
    @polylines-created="onPolylinesCreated"
    @polygons-created="onPolygonsCreated"
    @circles-created="onCirclesCreated"
    @rectangles-created="onRectanglesCreated"
  />
  <label>
    <input type="checkbox" v-model="state.markers.visible" />
    Markers
  </label>
  <label>
    <input type="checkbox" v-model="state.polylines.visible" />
    Polylines
  </label>
  <label>
    <input type="checkbox" v-model="state.polygons.visible" />
    Polygons
  </label>
  <label>
    <input type="checkbox" v-model="state.circles.visible" />
    Circles
  </label>
  <label>
    <input type="checkbox" v-model="state.rectangles.visible" />
    Rectangles
  </label>
</template>
