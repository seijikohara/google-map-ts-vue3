<template>
  <div ref="googleMapRef" :style="{ height: height, width: width }">
    <template v-if="state.google && state.map">
      <slot :google="state.google" :map="state.map" />
    </template>
  </div>
</template>

<script lang="ts">
/// <reference types="googlemaps" />
/* eslint-disable no-undef */
import { defineComponent, onMounted, PropType, reactive, ref } from "vue";

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
  setup(props: Props) {
    const state = reactive({
      map: {} as google.maps.Map<Element>,
      markers: [] as google.maps.Marker[],
      polylines: [] as google.maps.Polyline[],
      polygons: [] as google.maps.Polygon[],
      circles: [] as google.maps.Circle[],
      rectangles: [] as google.maps.Rectangle[],
    });
    const googleMapRef = ref<HTMLElement>();

    onMounted(() => {
      if (!googleMapRef.value) throw new Error("googleMapRef is undefined");

      loadGoogleMapsScript({
        key: props.apiKey,
        libraries: props.libraries,
      } as GoogleMapsScriptLoadParams)
        .then(() => {
          console.info("[GoogleMap] Initializing.");

          const mapElement = googleMapRef.value as HTMLElement;
          if (!mapElement)
            throw new Error("[GoogleMap] Failed to reference 'mapElement'");

          state.map = new google.maps.Map(mapElement, { ...props.options });
          console.info("[GoogleMap] Mounted.");

          state.markers = props.markers.map(
            (option) => new google.maps.Marker({ ...option, map: state.map })
          );
          state.polylines = props.polylines.map(
            (option) => new google.maps.Polyline({ ...option, map: state.map })
          );
          state.polygons = props.polygons.map(
            (option) => new google.maps.Polygon({ ...option, map: state.map })
          );
          state.circles = props.circles.map(
            (option) => new google.maps.Circle({ ...option, map: state.map })
          );
          state.rectangles = props.rectangles.map(
            (option) => new google.maps.Rectangle({ ...option, map: state.map })
          );
        })
        .catch((error) => console.error(error));
    });
    return {
      state,
      googleMapRef,
    };
  },
});
</script>
