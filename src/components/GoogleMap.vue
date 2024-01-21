<script lang="ts">
/// <reference types="google.maps" />

export type Props = {
  apiKey: string
  libraries: string
  height?: string
  width?: string
  options: google.maps.MapOptions
  markers?: google.maps.MarkerOptions[]
  polylines?: google.maps.PolylineOptions[]
  polygons?: google.maps.PolygonOptions[]
  circles?: google.maps.CircleOptions[]
  rectangles?: google.maps.RectangleOptions[]
}
</script>

<script lang="ts" setup>
/// <reference types="google.maps" />

import { ref, onMounted, watch } from 'vue'
import { loadGoogleMapsScript } from './GoogleMapLoader'

const props = withDefaults(defineProps<Props>(), {
  height: '500px',
  width: '500px',
  markers: () => [],
  polylines: () => [],
  polygons: () => [],
  circles: () => [],
  rectangles: () => []
})

const emit = defineEmits([
  'map-created',
  'markers-created',
  'polylines-created',
  'polygons-created',
  'circles-created',
  'rectangles-created'
])

const googleMapInstances = {
  map: {} as google.maps.Map,
  markers: [] as google.maps.Marker[],
  polylines: [] as google.maps.Polyline[],
  polygons: [] as google.maps.Polygon[],
  circles: [] as google.maps.Circle[],
  rectangles: [] as google.maps.Rectangle[]
}

const createMap = (mapElement: HTMLElement, option: google.maps.MapOptions): google.maps.Map => {
  const map = new google.maps.Map(mapElement, { ...option })
  emit('map-created', map)
  return map
}

const createMarkers = (
  map: google.maps.Map,
  options: google.maps.MarkerOptions[]
): google.maps.Marker[] => {
  const markers = options.map((option) => new google.maps.Marker({ ...option, map: map }))
  emit('markers-created', markers)
  return markers
}

const createPolylines = (
  map: google.maps.Map,
  options: google.maps.PolylineOptions[]
): google.maps.Polyline[] => {
  const polylines = options.map((option) => new google.maps.Polyline({ ...option, map: map }))
  emit('polylines-created', polylines)
  return polylines
}

const createPolygons = (
  map: google.maps.Map,
  options: google.maps.PolylineOptions[]
): google.maps.Polygon[] => {
  const polygons = options.map((option) => new google.maps.Polygon({ ...option, map: map }))
  emit('polygons-created', polygons)
  return polygons
}

const createCircles = (
  map: google.maps.Map,
  options: google.maps.CircleOptions[]
): google.maps.Circle[] => {
  const circles = options.map((option) => new google.maps.Circle({ ...option, map: map }))
  emit('circles-created', circles)
  return circles
}

const createRectangles = (
  map: google.maps.Map,
  options: google.maps.RectangleOptions[]
): google.maps.Rectangle[] => {
  const rectangles = options.map((option) => new google.maps.Rectangle({ ...option, map: map }))
  emit('rectangles-created', rectangles)
  return rectangles
}

const googleMapRef = ref<HTMLElement>()

onMounted(async () => {
  if (!googleMapRef.value) throw new Error('googleMapRef is undefined')

  try {
    await loadGoogleMapsScript({
      key: props.apiKey,
      libraries: props.libraries
    })

    const mapElement = googleMapRef.value as HTMLElement
    if (!mapElement) throw new Error("[GoogleMap] Failed to reference 'mapElement'")

    googleMapInstances.map = createMap(mapElement, props.options)
    googleMapInstances.markers = createMarkers(googleMapInstances.map, props.markers)
    googleMapInstances.polylines = createPolylines(googleMapInstances.map, props.polylines)
    googleMapInstances.polygons = createPolygons(googleMapInstances.map, props.polygons)
    googleMapInstances.circles = createCircles(googleMapInstances.map, props.circles)
    googleMapInstances.rectangles = createRectangles(googleMapInstances.map, props.rectangles)
  } catch (error) {
    console.error(error)
  }
})

watch(
  () => props.options,
  (value) => googleMapInstances.map.setOptions(value)
)
watch(
  () => props.markers,
  (value) => {
    googleMapInstances.markers.forEach((marker) => marker.setMap(null))
    googleMapInstances.markers = createMarkers(googleMapInstances.map, value)
  }
)
watch(
  () => props.polylines,
  (value) => {
    googleMapInstances.polylines.forEach((polyline) => polyline.setMap(null))
    googleMapInstances.polylines = createPolylines(googleMapInstances.map, value)
  }
)
watch(
  () => props.polygons,
  (value) => {
    googleMapInstances.polygons.forEach((polygon) => polygon.setMap(null))
    googleMapInstances.polygons = createPolygons(googleMapInstances.map, value)
  }
)
watch(
  () => props.circles,
  (value) => {
    googleMapInstances.circles.forEach((circle) => circle.setMap(null))
    googleMapInstances.circles = createCircles(googleMapInstances.map, value)
  }
)
watch(
  () => props.rectangles,
  (value) => {
    googleMapInstances.rectangles.forEach((rectangle) => rectangle.setMap(null))
    googleMapInstances.rectangles = createRectangles(googleMapInstances.map, value)
  }
)
</script>

<template>
  <div ref="googleMapRef" :style="{ height: height, width: width }" />
</template>
