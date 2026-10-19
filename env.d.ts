/// <reference types="vite/client" />
// @vue/tsconfig sets `types: []`, and the only other reference to the Google
// Maps globals lives in .vue files, which type-aware oxlint does not load.
/// <reference types="google.maps" />
interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
