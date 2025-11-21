<script lang="ts">
/// <reference types="google.maps" />

export interface Props {
  apiKey: string
  scriptLoadingTimeout?: number
  libraries?: string
  height?: string
  width?: string
  options: google.maps.MapOptions
  markers?: google.maps.marker.AdvancedMarkerElementOptions[]
  polylines?: google.maps.PolylineOptions[]
  polygons?: google.maps.PolygonOptions[]
  circles?: google.maps.CircleOptions[]
  rectangles?: google.maps.RectangleOptions[]
}

export interface Emits {
  'map-created': [map: google.maps.Map]
  'markers-created': [markers: google.maps.marker.AdvancedMarkerElement[]]
  'polylines-created': [polylines: google.maps.Polyline[]]
  'polygons-created': [polygons: google.maps.Polygon[]]
  'circles-created': [circles: google.maps.Circle[]]
  'rectangles-created': [rectangles: google.maps.Rectangle[]]
}
</script>

<script setup lang="ts">
/// <reference types="google.maps" />

import { ref, onMounted, watch, type Ref } from 'vue'
import { loadGoogleMapsScript } from './GoogleMapLoader'

const props = withDefaults(defineProps<Props>(), {
  scriptLoadingTimeout: 5000,
  libraries: 'marker,geometry,drawing,places',
  height: '500px',
  width: '500px',
  markers: () => [],
  polylines: () => [],
  polygons: () => [],
  circles: () => [],
  rectangles: () => []
})

const emit = defineEmits<Emits>()

// Reactive state management for map and overlay instances
const googleMap = ref<google.maps.Map | null>(null)
const markerInstances = ref<google.maps.marker.AdvancedMarkerElement[]>([])
const polylineInstances = ref<google.maps.Polyline[]>([])
const polygonInstances = ref<google.maps.Polygon[]>([])
const circleInstances = ref<google.maps.Circle[]>([])
const rectangleInstances = ref<google.maps.Rectangle[]>([])

// Factory functions for creating Google Maps instances
const createMapInstance = (
  mapElement: HTMLElement,
  options: google.maps.MapOptions
): google.maps.Map => new google.maps.Map(mapElement, options)

const createMarkerInstance = (
  option: google.maps.marker.AdvancedMarkerElementOptions,
  map: google.maps.Map
): google.maps.marker.AdvancedMarkerElement =>
  new google.maps.marker.AdvancedMarkerElement({ ...option, map })

const createPolylineInstance = (
  option: google.maps.PolylineOptions,
  map: google.maps.Map
): google.maps.Polyline => new google.maps.Polyline({ ...option, map })

const createPolygonInstance = (
  option: google.maps.PolygonOptions,
  map: google.maps.Map
): google.maps.Polygon => new google.maps.Polygon({ ...option, map })

const createCircleInstance = (
  option: google.maps.CircleOptions,
  map: google.maps.Map
): google.maps.Circle => new google.maps.Circle({ ...option, map })

const createRectangleInstance = (
  option: google.maps.RectangleOptions,
  map: google.maps.Map
): google.maps.Rectangle => new google.maps.Rectangle({ ...option, map })

// Higher-order function for creating multiple instances from options array
const createInstancesWithEmit =
  <TOption, TInstance>(factory: (option: TOption, map: google.maps.Map) => TInstance) =>
  (map: google.maps.Map, options: TOption[]): TInstance[] =>
    options.map((option) => factory(option, map))

const createMap = (mapElement: HTMLElement, options: google.maps.MapOptions): google.maps.Map => {
  const map = createMapInstance(mapElement, options)
  emit('map-created', map)
  return map
}

const createMarkers = (
  map: google.maps.Map,
  options: google.maps.marker.AdvancedMarkerElementOptions[]
): google.maps.marker.AdvancedMarkerElement[] => {
  const markers = createInstancesWithEmit(createMarkerInstance)(map, options)
  emit('markers-created', markers)
  return markers
}

const createPolylines = (
  map: google.maps.Map,
  options: google.maps.PolylineOptions[]
): google.maps.Polyline[] => {
  const polylines = createInstancesWithEmit(createPolylineInstance)(map, options)
  emit('polylines-created', polylines)
  return polylines
}

const createPolygons = (
  map: google.maps.Map,
  options: google.maps.PolygonOptions[]
): google.maps.Polygon[] => {
  const polygons = createInstancesWithEmit(createPolygonInstance)(map, options)
  emit('polygons-created', polygons)
  return polygons
}

const createCircles = (
  map: google.maps.Map,
  options: google.maps.CircleOptions[]
): google.maps.Circle[] => {
  const circles = createInstancesWithEmit(createCircleInstance)(map, options)
  emit('circles-created', circles)
  return circles
}

const createRectangles = (
  map: google.maps.Map,
  options: google.maps.RectangleOptions[]
): google.maps.Rectangle[] => {
  const rectangles = createInstancesWithEmit(createRectangleInstance)(map, options)
  emit('rectangles-created', rectangles)
  return rectangles
}

// Remove markers from the map by setting their map property to null
const clearMarkers = (markerList: google.maps.marker.AdvancedMarkerElement[]): void => {
  markerList.forEach((marker) => {
    marker.map = null
  })
}

// Remove overlays from the map using the generic setMap method
const clearOverlays = <T extends { setMap: (map: google.maps.Map | null) => void }>(
  overlays: T[]
): void => {
  overlays.forEach((overlay) => {
    overlay.setMap(null)
  })
}

// Generic higher-order function that creates update handlers for overlays
type OverlayRef<T> = Ref<T[]>

const createOverlayUpdater =
  <TInstance, TOption>(
    overlayRef: OverlayRef<TInstance>,
    clearFn: (instances: TInstance[]) => void,
    createFn: (map: google.maps.Map, options: TOption[]) => TInstance[]
  ) =>
  (options: TOption[]): void => {
    if (!googleMap.value) return
    clearFn(overlayRef.value)
    overlayRef.value = createFn(googleMap.value, options)
  }

// Load Google Maps script and initialize map with all overlays
const initializeMap = async (mapElement: HTMLElement): Promise<void> => {
  await loadGoogleMapsScript(
    {
      key: props.apiKey,
      libraries: props.libraries
    },
    props.scriptLoadingTimeout
  )

  googleMap.value = createMap(mapElement, props.options)
  markerInstances.value = createMarkers(googleMap.value, props.markers)
  polylineInstances.value = createPolylines(googleMap.value, props.polylines)
  polygonInstances.value = createPolygons(googleMap.value, props.polygons)
  circleInstances.value = createCircles(googleMap.value, props.circles)
  rectangleInstances.value = createRectangles(googleMap.value, props.rectangles)
}

const googleMapRef: Ref<HTMLElement | undefined> = ref()

// Type guard to safely narrow unknown errors to Error instances
const isError = (error: unknown): error is Error => error instanceof Error

// Type-safe error handler that preserves error messages and stack traces
const handleInitializationError = (error: unknown): never => {
  const errorMessage = isError(error)
    ? error.message
    : typeof error === 'string'
      ? error
      : 'Unknown initialization error'

  const enhancedError = new Error(`[GoogleMap] Initialization failed: ${errorMessage}`)

  if (isError(error) && error.stack) {
    enhancedError.stack = error.stack
  }

  console.error(enhancedError)
  throw enhancedError
}

onMounted(async () => {
  const mapElement = googleMapRef.value
  if (!mapElement) {
    throw new Error('[GoogleMap] Map element reference not found.')
  }

  try {
    await initializeMap(mapElement)
  } catch (error) {
    handleInitializationError(error)
  }
})

// Update map options using optional chaining for null safety
const updateOptions = (options: google.maps.MapOptions): void => {
  googleMap.value?.setOptions(options)
}

// Create specialized update functions by partially applying the generic updater
const updateMarkers = createOverlayUpdater(markerInstances, clearMarkers, createMarkers)
const updatePolylines = createOverlayUpdater(polylineInstances, clearOverlays, createPolylines)
const updatePolygons = createOverlayUpdater(polygonInstances, clearOverlays, createPolygons)
const updateCircles = createOverlayUpdater(circleInstances, clearOverlays, createCircles)
const updateRectangles = createOverlayUpdater(rectangleInstances, clearOverlays, createRectangles)

watch(() => props.options, updateOptions)
watch(() => props.markers, updateMarkers)
watch(() => props.polylines, updatePolylines)
watch(() => props.polygons, updatePolygons)
watch(() => props.circles, updateCircles)
watch(() => props.rectangles, updateRectangles)
</script>

<template>
  <div ref="googleMapRef" :style="{ height, width }" />
</template>
