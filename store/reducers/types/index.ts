export interface LocationWeatherState {
  loading: boolean
  error: object | null
  locationInfo: {
    lat: number
    lon: number
    placeName: string
  }
  weatherInfo: {
    current: {
      cloudiness: number
      dewPoint: number
      feelsLikeTemp: number
      precipProb: number
      precipRate: number
      pressure: number
      relHumidity: number
      symbol: string
      symbolPhrase: string
      temperature: number
      thunderProb: number
      time: string
      uvIndex: number
      visibility: number
      windDirString: string
      windGust: number
      windSpeed: number
    }
    daily: {
      date: string
      maxTemp: number
      maxWindSpeed: number
      minTemp: number
      precipAccum: number
      symbol: string
      windDir: number
    }[]
    hourly: {
      feelsLikeTemp: number
      precipAccum: number
      precipProb: number
      symbol: string
      temperature: number
      time: string
      windDir: number
      windDirString: string
      windGust: number
      windSpeed: number
    }[]
    minutely: {
      feelsLikeTemp: number
      precipProb: number
      precipRate: number
      symbol: string
      temperature: number
      time: string
      windDir: number
      windDirString: string
      windGust: number
      windSpeed: number
    }[]
  }
}
