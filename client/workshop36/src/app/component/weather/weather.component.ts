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
  params$!: Subscription;
  pathVar$!: Subscription;
  city!: string;
  units!: string;

  constructor(
    private weatherService: WeatherService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  // Reloads doesn't work because the weather api will only called once the component is initialized
  // Thus we need to subscribe to the queryParams and get the city and units from there
  ngOnInit(): void {
    this.pathVar$ = this.activatedRoute.params.subscribe((pathVar) => {
      console.log('path variable >>> ' + pathVar);
      const cityInput: string = pathVar['city'];
      this.city = cityInput;
    });

    this.params$ = this.activatedRoute.queryParams.subscribe((params) => {
      console.log('query params >>>' + params);
      const unitsInput: string = params['units'];
      this.units = unitsInput;
    });
    this.weather$ = this.weatherService.getWeather(this.city, this.units);
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
}
