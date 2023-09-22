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

export const loadGoogleMapsScript = (params: GoogleMapsScriptLoadParams): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.info('[GoogleMap] Script loading.')
    if (window.google) {
      console.info('[GoogleMap] Script already loaded.')
      return resolve()
    }

    const headElement = document.querySelector('head')
    if (!headElement) {
      return reject(new Error('[GoogleMap] Head node is undefined.'))
    }

    const scriptElement = document.createElement('script')
    const url = new URL('https://maps.googleapis.com/maps/api/js')
    Object.entries({
      callback: 'handleLoadGoogleMapsScript',
      ...params
    }).forEach(([key, value]) => url.searchParams.set(key, value))
    scriptElement.src = url.toString()
    headElement.appendChild(scriptElement)

    window.handleLoadGoogleMapsScript = () => {
      console.info('[GoogleMap] Script loaded.')
      resolve()
    }

    setTimeout(() => {
      if (!window.google) {
        reject(new Error('[GoogleMap] Failed to load google api'))
      }
    }, 5000)
  })
}
