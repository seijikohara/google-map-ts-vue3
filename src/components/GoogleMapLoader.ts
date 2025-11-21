interface GoogleMapWindow extends Window {
  google: typeof google | undefined
}

declare const window: GoogleMapWindow

export interface GoogleMapsScriptLoadParams {
  readonly key: string
  readonly libraries: string
}

const GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/js' as const

let callbackCounter = 0

const generateUniqueCallbackName = (): string => {
  callbackCounter += 1
  return `__googleMapsCallback_${Date.now()}_${callbackCounter}`
}

const isScriptLoaded = (): boolean => window.google !== undefined

const createScriptUrl = (params: GoogleMapsScriptLoadParams, callbackName: string): URL => {
  const url = new URL(GOOGLE_MAPS_API_URL)
  url.searchParams.set('callback', callbackName)
  url.searchParams.set('key', params.key)
  url.searchParams.set('libraries', params.libraries)
  return url
}

const createScriptElement = (url: URL): HTMLScriptElement => {
  const scriptElement = document.createElement('script')
  scriptElement.src = url.toString()
  scriptElement.async = true
  scriptElement.defer = true
  return scriptElement
}

const appendScript = (headElement: HTMLElement, scriptElement: HTMLScriptElement): void => {
  headElement.appendChild(scriptElement)
}

const createLoadPromise = (
  scriptElement: HTMLScriptElement,
  timeout: number,
  callbackName: string
): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      if (!isScriptLoaded()) {
        cleanup()
        reject(new Error('[GoogleMap] Script loading timeout.'))
      }
    }, timeout)

    const cleanup = (): void => {
      clearTimeout(timeoutId)
      // Remove the temporary global callback function
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any)[callbackName]
    }

    // Create a unique global callback for this script load operation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any)[callbackName] = (): void => {
      cleanup()
      console.info('[GoogleMap] Script loaded.')
      resolve()
    }

    scriptElement.onerror = (event): void => {
      cleanup()
      const errorMessage =
        event instanceof ErrorEvent
          ? event.message
          : event instanceof Event
            ? `Failed to load script from ${scriptElement.src}`
            : 'Unknown script loading error'
      reject(new Error(`[GoogleMap] ${errorMessage}`))
    }
  })

export const loadGoogleMapsScript = async (
  params: GoogleMapsScriptLoadParams,
  timeout: number
): Promise<void> => {
  console.info('[GoogleMap] Script loading.')

  if (isScriptLoaded()) {
    console.info('[GoogleMap] Script already loaded.')
    return
  }

  const headElement = document.querySelector('head')
  if (!headElement) {
    throw new Error('[GoogleMap] Head element not found.')
  }

  const callbackName = generateUniqueCallbackName()
  const url = createScriptUrl(params, callbackName)
  const scriptElement = createScriptElement(url)
  const loadPromise = createLoadPromise(scriptElement, timeout, callbackName)

  appendScript(headElement, scriptElement)

  await loadPromise
}
