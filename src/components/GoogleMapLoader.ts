import { stringify } from "query-string";

type GoogleMapsScriptHandler = () => void;

interface GoogleMapWindow extends Window {
  handleLoadGoogleMapsScript: GoogleMapsScriptHandler;
  google: unknown;
}
declare const window: GoogleMapWindow;

export type GoogleMapsScriptLoadParams = {
  key: string;
  libraries: string;
};

export function loadGoogleMapsScript(
  params: GoogleMapsScriptLoadParams
): Promise<void> {
  return new Promise((resolve, reject) => {
    console.info("[GoogleMap] Script loading.");
    if (window.google) {
      console.info("[GoogleMap] Script already loaded.");
      return resolve();
    }

    const headElement = document.querySelector("head");
    if (!headElement) {
      return reject(new Error("[GoogleMap] Head node is undefined."));
    }

    const scriptElement = document.createElement("script");
    scriptElement.src = `https://maps.googleapis.com/maps/api/js?${stringify({
      callback: "handleLoadGoogleMapsScript",
      ...params,
    })}`;
    headElement.appendChild(scriptElement);
    window.handleLoadGoogleMapsScript = () => {
      console.info("[GoogleMap] Script loaded.");
      resolve();
    };
    setTimeout(() => {
      if (!window.google) {
        reject(new Error("[GoogleMap] Failed load google api"));
      }
    }, 5000);
  });
}
