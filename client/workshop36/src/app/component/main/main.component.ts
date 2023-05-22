import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { WeatherService } from 'src/app/service/weather.service';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  form!: FormGroup;
  weather$!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm() {
    return this.fb.group({
      city: this.fb.control<string>('', Validators.required),
      units: this.fb.control<string>('metric', Validators.required),
    });
  }

  checkWeather() {
    // testing in main component
    let response = this.weatherService.getWeather(
      this.form.value.city,
      this.form.value.units
    );
    this.weather$ = response;

    // navigate to Weather Component
    const cityInput = this.form.value.city;
    const unitsInput = this.form.value.units;
    console.log('City input from main component >>> ', cityInput);

    const params: Params = {
      city: cityInput,
      units: unitsInput,
    };
    this.router.navigate(['/weather'], {
      queryParams: params,
    });
  }
}
