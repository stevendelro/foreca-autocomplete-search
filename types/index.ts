export interface HashTable<T> {
  [index: string]: T
}

export interface GeolocationInfo {
  coords: { latitude: number; longitude: number }
  timestamp: number
}
