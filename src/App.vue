<script setup lang="ts">
/// <reference types="google.maps" />

import { ref, computed } from 'vue'
import { GoogleMap } from './components'

defineOptions({
  name: 'App'
})

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string

// Map ID is required for AdvancedMarkerElement
const options = {
  center: { lat: 35.1, lng: 135.1 },
  zoom: 5,
  mapId: 'DEMO_MAP_ID'
} as const satisfies google.maps.MapOptions

const baseMarkers = [
  {
    position: { lat: 35.1, lng: 135.1 },
    title: 'Position 1'
  },
  {
    position: { lat: 37.1, lng: 139.1 },
    title: 'Position 2'
  }
] as const satisfies readonly google.maps.marker.AdvancedMarkerElementOptions[]

const basePolylines = [
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
] as const satisfies readonly google.maps.PolylineOptions[]

const basePolygons = [
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
] as const satisfies readonly google.maps.PolygonOptions[]

const baseCircles = [
  {
    center: { lat: 39.1, lng: 140.1 },
    radius: 100000,
    strokeColor: '#ff0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#ff0000',
    fillOpacity: 0.35
  }
] as const satisfies readonly google.maps.CircleOptions[]

const baseRectangles = [
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
] as const satisfies readonly google.maps.RectangleOptions[]

const markersVisible = ref(true)
const polylinesVisible = ref(true)
const polygonsVisible = ref(true)
const circlesVisible = ref(true)
const rectanglesVisible = ref(true)

const markers = computed(() => (markersVisible.value ? baseMarkers : []))
const polylines = computed(() => (polylinesVisible.value ? basePolylines : []))
const polygons = computed(() => (polygonsVisible.value ? basePolygons : []))
const circles = computed(() => (circlesVisible.value ? baseCircles : []))
const rectangles = computed(() => (rectanglesVisible.value ? baseRectangles : []))

const handleMapCreated = (map: google.maps.Map) => {
  console.log('Map created:', map)
}

const handleMarkersCreated = (markers: google.maps.marker.AdvancedMarkerElement[]) => {
  console.log('Markers created:', markers)
}

const handlePolylinesCreated = (polylines: google.maps.Polyline[]) => {
  console.log('Polylines created:', polylines)
}

const handlePolygonsCreated = (polygons: google.maps.Polygon[]) => {
  console.log('Polygons created:', polygons)
}

const handleCirclesCreated = (circles: google.maps.Circle[]) => {
  console.log('Circles created:', circles)
}

const handleRectanglesCreated = (rectangles: google.maps.Rectangle[]) => {
  console.log('Rectangles created:', rectangles)
}
</script>

<template>
  <div class="app">
    <GoogleMap
      :api-key="apiKey"
      :options="options"
      :markers="markers"
      :polylines="polylines"
      :polygons="polygons"
      :circles="circles"
      :rectangles="rectangles"
      @map-created="handleMapCreated"
      @markers-created="handleMarkersCreated"
      @polylines-created="handlePolylinesCreated"
      @polygons-created="handlePolygonsCreated"
      @circles-created="handleCirclesCreated"
      @rectangles-created="handleRectanglesCreated"
    />
    <div class="controls">
      <label class="control-label">
        <input v-model="markersVisible" type="checkbox" />
        Markers
      </label>
      <label class="control-label">
        <input v-model="polylinesVisible" type="checkbox" />
        Polylines
      </label>
      <label class="control-label">
        <input v-model="polygonsVisible" type="checkbox" />
        Polygons
      </label>
      <label class="control-label">
        <input v-model="circlesVisible" type="checkbox" />
        Circles
      </label>
      <label class="control-label">
        <input v-model="rectanglesVisible" type="checkbox" />
        Rectangles
      </label>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.control-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.control-label input[type='checkbox'] {
  cursor: pointer;
}
</style>
