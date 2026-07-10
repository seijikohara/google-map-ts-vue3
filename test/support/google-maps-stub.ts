import { vi } from 'vitest'

type MapConstructorArgs = [element: HTMLElement, options: google.maps.MapOptions]

export interface GoogleMapsStub {
  mapCtor: ReturnType<typeof vi.fn<(...args: MapConstructorArgs) => void>>
  advancedMarkerElementCtor: ReturnType<typeof vi.fn>
  polylineCtor: ReturnType<typeof vi.fn>
  polygonCtor: ReturnType<typeof vi.fn>
  circleCtor: ReturnType<typeof vi.fn>
  rectangleCtor: ReturnType<typeof vi.fn>
  addListener: ReturnType<typeof vi.fn>
  removeListener: ReturnType<typeof vi.fn>
  clearInstanceListeners: ReturnType<typeof vi.fn>
}

/**
 * Install a fresh `window.google.maps` stub and return every constructor
 * mock, so tests can assert on call counts, call arguments, and the
 * identity of constructed instances.
 *
 * `GoogleMapLoader.isScriptLoaded()` (src/components/GoogleMapLoader.ts)
 * treats any defined `window.google` as "already loaded" and returns
 * immediately -- it never appends a script tag or registers the
 * JSONP-style global callback in that case. Predefining `window.google`
 * here, before a component mounts, is therefore sufficient to
 * short-circuit script loading entirely: no network call, no callback
 * global to simulate. Call this again in a `beforeEach` for every test so
 * each test starts with fresh, uncontaminated mock call history.
 */
export function installGoogleMapsStub(): GoogleMapsStub {
  const mapCtor = vi.fn<(...args: MapConstructorArgs) => void>(function (
    this: Record<string, unknown>
  ) {
    this.setOptions = vi.fn()
  })

  const advancedMarkerElementCtor = vi.fn(function (
    this: Record<string, unknown>,
    options: { map: unknown }
  ) {
    this.map = options.map
  })

  const createOverlayCtor = () =>
    vi.fn(function (this: Record<string, unknown>) {
      this.setMap = vi.fn()
    })

  const polylineCtor = createOverlayCtor()
  const polygonCtor = createOverlayCtor()
  const circleCtor = createOverlayCtor()
  const rectangleCtor = createOverlayCtor()

  const addListener = vi.fn()
  const removeListener = vi.fn()
  const clearInstanceListeners = vi.fn()

  window.google = {
    maps: {
      Map: mapCtor,
      marker: {
        AdvancedMarkerElement: advancedMarkerElementCtor
      },
      Polyline: polylineCtor,
      Polygon: polygonCtor,
      Circle: circleCtor,
      Rectangle: rectangleCtor,
      event: {
        addListener,
        removeListener,
        clearInstanceListeners
      }
    }
  } as unknown as typeof google

  return {
    mapCtor,
    advancedMarkerElementCtor,
    polylineCtor,
    polygonCtor,
    circleCtor,
    rectangleCtor,
    addListener,
    removeListener,
    clearInstanceListeners
  }
}
