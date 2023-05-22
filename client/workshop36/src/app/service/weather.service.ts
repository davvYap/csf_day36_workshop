import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Weather } from '../models';
import { Observable, debounceTime, map, tap } from 'rxjs';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(city: string, units: string): Observable<Weather> {
    const cityParam = new HttpParams().set('city', city).append('units', units);

    return this.http.get<Weather>('/api/weather', { params: cityParam }).pipe(
      debounceTime(2000),
      map((v) => v),
      tap((v) => console.log(v))
    );
    // .pipe(map((res) => res.weather[0].description));
  }
}
