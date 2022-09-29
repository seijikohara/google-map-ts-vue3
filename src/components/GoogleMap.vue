<template>
  <div ref="googleMapRef" :style="{ height: height, width: width }" />
</template>

<script lang="ts">
/// <reference types="google.maps" />
/* eslint-disable no-undef */
import { defineComponent, onMounted, PropType, ref, watch } from "vue";

import {
  loadGoogleMapsScript,
  GoogleMapsScriptLoadParams,
} from "./GoogleMapLoader";

type Props = {
  apiKey: string;
  libraries: string;
  height: string;
  width: string;
  options: google.maps.MapOptions;
  markers: google.maps.MarkerOptions[];
  polylines: google.maps.PolylineOptions[];
  polygons: google.maps.PolygonOptions[];
  circles: google.maps.CircleOptions[];
  rectangles: google.maps.RectangleOptions[];
};

export default defineComponent({
  name: "GoogleMap",
  props: {
    apiKey: {
      type: String,
      required: true,
    },
    libraries: {
      type: String,
      required: true,
      default: "geometry,drawing,places",
    },
    height: {
      type: String,
      required: false,
      default: "500px",
    },
    width: {
      type: String,
      required: false,
      default: "500px",
    },
    options: {
      type: Object as PropType<google.maps.MapOptions>,
      required: true,
    },
    markers: {
      type: Array as PropType<google.maps.MarkerOptions[]>,
      required: false,
      default: () => [],
    },
    polylines: {
      type: Array as PropType<google.maps.PolylineOptions[]>,
      required: false,
      default: () => [],
    },
    polygons: {
      type: Array as PropType<google.maps.PolygonOptions[]>,
      required: false,
      default: () => [],
    },
    circles: {
      type: Array as PropType<google.maps.CircleOptions[]>,
      required: false,
      default: () => [],
    },
    rectangles: {
      type: Array as PropType<google.maps.RectangleOptions[]>,
      required: false,
      default: () => [],
    },
  },
  setup(props: Props, { emit }) {
    let map = {} as google.maps.Map;
    let markers = [] as google.maps.Marker[];
    let polylines = [] as google.maps.Polyline[];
    let polygons = [] as google.maps.Polygon[];
    let circles = [] as google.maps.Circle[];
    let rectangles = [] as google.maps.Rectangle[];

    function createMap(
      mapElement: HTMLElement,
      option: google.maps.MapOptions
    ): google.maps.Map {
      const map = new google.maps.Map(mapElement, { ...option });
      emit("map-created", map);
      return map;
    }

    function createMarkers(
      map: google.maps.Map,
      options: google.maps.MarkerOptions[]
    ): google.maps.Marker[] {
      const markers = options.map(
        (option) => new google.maps.Marker({ ...option, map: map })
      );
      emit("markers-created", markers);
      return markers;
    }

    function createPolylines(
      map: google.maps.Map,
      options: google.maps.PolylineOptions[]
    ): google.maps.Polyline[] {
      const polylines = options.map(
        (option) => new google.maps.Polyline({ ...option, map: map })
      );
      emit("polylines-created", polylines);
      return polylines;
    }

    function createPolygons(
      map: google.maps.Map,
      options: google.maps.PolylineOptions[]
    ): google.maps.Polygon[] {
      const polygons = options.map(
        (option) => new google.maps.Polygon({ ...option, map: map })
      );
      emit("polygons-created", polygons);
      return polygons;
    }

    function createCircles(
      map: google.maps.Map,
      options: google.maps.CircleOptions[]
    ): google.maps.Circle[] {
      const circles = options.map(
        (option) => new google.maps.Circle({ ...option, map: map })
      );
      emit("circles-created", circles);
      return circles;
    }

    function createRectangles(
      map: google.maps.Map,
      options: google.maps.RectangleOptions[]
    ): google.maps.Rectangle[] {
      const rectangles = options.map(
        (option) => new google.maps.Rectangle({ ...option, map: map })
      );
      emit("rectangles-created", rectangles);
      return rectangles;
    }

    const googleMapRef = ref<HTMLElement>();

    onMounted(() => {
      if (!googleMapRef.value) throw new Error("googleMapRef is undefined");

      loadGoogleMapsScript({
        key: props.apiKey,
        libraries: props.libraries,
      } as GoogleMapsScriptLoadParams)
        .then(() => {
          const mapElement = googleMapRef.value as HTMLElement;
          if (!mapElement)
            throw new Error("[GoogleMap] Failed to reference 'mapElement'");

          map = createMap(mapElement, props.options);
          markers = createMarkers(map, props.markers);
          polylines = createPolylines(map, props.polylines);
          polygons = createPolygons(map, props.polygons);
          circles = createCircles(map, props.circles);
          rectangles = createRectangles(map, props.rectangles);
        })
        .catch((error) => console.error(error));
    });

    watch(
      () => props.options,
      (value) => map.setOptions(value)
    );
    watch(
      () => props.markers,
      (value) => {
        markers.forEach((marker) => marker.setMap(null));
        markers = createMarkers(map, value);
      }
    );
    watch(
      () => props.polylines,
      (value) => {
        polylines.forEach((polyline) => polyline.setMap(null));
        polylines = createPolylines(map, value);
      }
    );
    watch(
      () => props.polygons,
      (value) => {
        polygons.forEach((polygon) => polygon.setMap(null));
        polygons = createPolygons(map, value);
      }
    );
    watch(
      () => props.circles,
      (value) => {
        circles.forEach((circle) => circle.setMap(null));
        circles = createCircles(map, value);
      }
    );
    watch(
      () => props.rectangles,
      (value) => {
        rectangles.forEach((rectangle) => rectangle.setMap(null));
        rectangles = createRectangles(map, value);
      }
    );

    return {
      googleMapRef,
    };
  },
});
</script>
