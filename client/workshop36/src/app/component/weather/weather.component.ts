import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../../service/weather.service';
import { Observable, Subscription } from 'rxjs';
import { Weather } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit, OnDestroy {
  weather$!: Observable<Weather>;
  tempUnit!: string;
  params$!: Subscription;
  city!: string;
  units!: string;

  constructor(
    private weatherService: WeatherService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  // Reloads doesn't work because the weather api will only called once the component is initialized
  ngOnInit(): void {
    this.params$ = this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      const cityInput: string = params['city'];
      const unitsInput: string = params['units'];
      this.tempUnit = unitsInput;
      this.city = cityInput;
      this.units = unitsInput;
      this.weather$ = this.weatherService.getWeather(cityInput, unitsInput);
    });
    // const cityInput: string = this.activatedRoute.snapshot.queryParams['city'];
    // const unitsInput: string =
    //   this.activatedRoute.snapshot.queryParams['units'];
    // this.tempUnit = unitsInput;
    // console.log(
    //   'City input from weather component >>> ',
    //   cityInput,
    //   unitsInput
    // );
    // this.weather$ = this.weatherService.getWeather(cityInput, unitsInput);
    this.title.setTitle('Weather | Weather App');
  }

  ngOnDestroy(): void {
    console.log('Weather component destroyed');
    this.params$.unsubscribe();
  }

  back() {
    this.router.navigate(['/']);
  }

  reload() {
    this.router.navigate(['/weather'], {
      queryParams: {
        city: this.city,
        units: this.units,
      },
    });
    console.log('Reloaded Weather Component');
  }
}
