type GoogleMapsScriptHandler = () => void

interface GoogleMapWindow extends Window {
  handleLoadGoogleMapsScript: GoogleMapsScriptHandler
  google: unknown
}
declare const window: GoogleMapWindow

export type GoogleMapsScriptLoadParams = {
  key: string
  libraries: string
}

export const loadGoogleMapsScript = async (
  params: GoogleMapsScriptLoadParams,
  timeout: number
): Promise<void> => {
  console.info('[GoogleMap] Script loading.')
  if (window.google) {
    console.info('[GoogleMap] Script already loaded.')
    return
  }

  const headElement = document.querySelector('head')
  if (!headElement) {
    throw new Error('[GoogleMap] Head node is undefined.')
  }

  const scriptElement = document.createElement('script')
  const url = new URL('https://maps.googleapis.com/maps/api/js')
  Object.entries({
    callback: 'handleLoadGoogleMapsScript',
    ...params
  }).forEach(([key, value]) => url.searchParams.set(key, value))
  scriptElement.src = url.toString()
  headElement.appendChild(scriptElement)

  await new Promise<void>((resolve, reject) => {
    window.handleLoadGoogleMapsScript = () => {
      console.info('[GoogleMap] Script loaded.')
      resolve()
    }

    setTimeout(() => {
      if (!window.google) {
        reject(new Error('[GoogleMap] Failed to load google api'))
      }
    }, timeout)
  })
}
