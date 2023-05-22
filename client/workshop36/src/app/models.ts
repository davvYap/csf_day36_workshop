export interface Weather {
  id: number;
  name: string;
  cod: number;
  weather: Condition[];
  timezone: number;
  coord: Coordinate;
  main: Main;
}

export interface Condition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

export interface Coordinate {
  lon: number;
  lat: number;
}
