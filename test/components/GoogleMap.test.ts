import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import GoogleMap from '../../src/components/GoogleMap.vue'
import { installGoogleMapsStub, type GoogleMapsStub } from '../support/google-maps-stub'

let stub: GoogleMapsStub

beforeEach(() => {
  stub = installGoogleMapsStub()
})

const baseOptions: google.maps.MapOptions = {
  center: { lat: 35.1, lng: 135.1 },
  zoom: 5,
  mapId: 'DEMO_MAP_ID'
}

describe('GoogleMap', () => {
  it('constructs the map with the configured center and zoom, and emits map-created', async () => {
    const { emitted } = await render(GoogleMap, {
      props: {
        apiKey: 'test-api-key',
        options: baseOptions
      }
    })

    await vi.waitFor(() => {
      expect(stub.mapCtor).toHaveBeenCalledTimes(1)
    })

    const [, constructedOptions] = stub.mapCtor.mock.calls[0]
    expect(constructedOptions).toMatchObject({
      center: baseOptions.center,
      zoom: baseOptions.zoom
    })

    const mapCreatedEvents = emitted<[google.maps.Map]>('map-created')
    expect(mapCreatedEvents).toHaveLength(1)
    expect(mapCreatedEvents?.[0][0]).toBe(stub.mapCtor.mock.instances[0])
  })

  it('creates one AdvancedMarkerElement per marker option and emits markers-created', async () => {
    const markers: google.maps.marker.AdvancedMarkerElementOptions[] = [
      { position: { lat: 35.1, lng: 135.1 }, title: 'Position 1' },
      { position: { lat: 37.1, lng: 139.1 }, title: 'Position 2' }
    ]

    const { emitted } = await render(GoogleMap, {
      props: { apiKey: 'test-api-key', options: baseOptions, markers }
    })

    await vi.waitFor(() => {
      expect(stub.advancedMarkerElementCtor).toHaveBeenCalledTimes(2)
    })

    expect(stub.advancedMarkerElementCtor.mock.calls[0][0]).toMatchObject({
      position: markers[0]?.position,
      title: markers[0]?.title,
      map: stub.mapCtor.mock.instances[0]
    })

    const markersCreatedEvents = emitted<[google.maps.marker.AdvancedMarkerElement[]]>(
      'markers-created'
    )
    expect(markersCreatedEvents).toHaveLength(1)
    expect(markersCreatedEvents?.[0][0]).toEqual(stub.advancedMarkerElementCtor.mock.instances)
  })

  it('creates one Polyline per polyline option and emits polylines-created', async () => {
    const polylines: google.maps.PolylineOptions[] = [
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
    ]

    const { emitted } = await render(GoogleMap, {
      props: { apiKey: 'test-api-key', options: baseOptions, polylines }
    })

    await vi.waitFor(() => {
      expect(stub.polylineCtor).toHaveBeenCalledTimes(1)
    })

    expect(stub.polylineCtor.mock.calls[0][0]).toMatchObject({
      path: polylines[0]?.path,
      map: stub.mapCtor.mock.instances[0]
    })

    const polylinesCreatedEvents = emitted<[google.maps.Polyline[]]>('polylines-created')
    expect(polylinesCreatedEvents).toHaveLength(1)
    expect(polylinesCreatedEvents?.[0][0]).toEqual(stub.polylineCtor.mock.instances)
  })

  it('creates one Polygon per polygon option and emits polygons-created', async () => {
    const polygons: google.maps.PolygonOptions[] = [
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
    ]

    const { emitted } = await render(GoogleMap, {
      props: { apiKey: 'test-api-key', options: baseOptions, polygons }
    })

    await vi.waitFor(() => {
      expect(stub.polygonCtor).toHaveBeenCalledTimes(1)
    })

    expect(stub.polygonCtor.mock.calls[0][0]).toMatchObject({
      paths: polygons[0]?.paths,
      map: stub.mapCtor.mock.instances[0]
    })

    const polygonsCreatedEvents = emitted<[google.maps.Polygon[]]>('polygons-created')
    expect(polygonsCreatedEvents).toHaveLength(1)
    expect(polygonsCreatedEvents?.[0][0]).toEqual(stub.polygonCtor.mock.instances)
  })

  it('creates one Circle per circle option and emits circles-created', async () => {
    const circles: google.maps.CircleOptions[] = [
      {
        center: { lat: 39.1, lng: 140.1 },
        radius: 100000,
        strokeColor: '#ff0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ff0000',
        fillOpacity: 0.35
      }
    ]

    const { emitted } = await render(GoogleMap, {
      props: { apiKey: 'test-api-key', options: baseOptions, circles }
    })

    await vi.waitFor(() => {
      expect(stub.circleCtor).toHaveBeenCalledTimes(1)
    })

    expect(stub.circleCtor.mock.calls[0][0]).toMatchObject({
      center: circles[0]?.center,
      radius: circles[0]?.radius,
      map: stub.mapCtor.mock.instances[0]
    })

    const circlesCreatedEvents = emitted<[google.maps.Circle[]]>('circles-created')
    expect(circlesCreatedEvents).toHaveLength(1)
    expect(circlesCreatedEvents?.[0][0]).toEqual(stub.circleCtor.mock.instances)
  })

  it('creates one Rectangle per rectangle option and emits rectangles-created', async () => {
    const rectangles: google.maps.RectangleOptions[] = [
      {
        bounds: { north: 30, south: 33, east: 133, west: 130 },
        strokeColor: '#ff0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ff0000',
        fillOpacity: 0.35
      }
    ]

    const { emitted } = await render(GoogleMap, {
      props: { apiKey: 'test-api-key', options: baseOptions, rectangles }
    })

    await vi.waitFor(() => {
      expect(stub.rectangleCtor).toHaveBeenCalledTimes(1)
    })

    expect(stub.rectangleCtor.mock.calls[0][0]).toMatchObject({
      bounds: rectangles[0]?.bounds,
      map: stub.mapCtor.mock.instances[0]
    })

    const rectanglesCreatedEvents = emitted<[google.maps.Rectangle[]]>('rectangles-created')
    expect(rectanglesCreatedEvents).toHaveLength(1)
    expect(rectanglesCreatedEvents?.[0][0]).toEqual(stub.rectangleCtor.mock.instances)
  })

  it('constructs no overlays when the array props are omitted', async () => {
    await render(GoogleMap, {
      props: { apiKey: 'test-api-key', options: baseOptions }
    })

    await vi.waitFor(() => {
      expect(stub.mapCtor).toHaveBeenCalledTimes(1)
    })

    expect(stub.advancedMarkerElementCtor).not.toHaveBeenCalled()
    expect(stub.polylineCtor).not.toHaveBeenCalled()
    expect(stub.polygonCtor).not.toHaveBeenCalled()
    expect(stub.circleCtor).not.toHaveBeenCalled()
    expect(stub.rectangleCtor).not.toHaveBeenCalled()
  })
})
