package sg.edu.nus.iss.workshop36.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sg.edu.nus.iss.workshop36.service.WeatherService;

@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class WeatherRestController {

    @Autowired
    private WeatherService weatherSvc;

    @GetMapping(path = "/weather")
    public ResponseEntity<String> getWeather(@RequestParam String city,
            @RequestParam(defaultValue = "metric") String units) {
        return weatherSvc.getWeather(city, units);
    }
}
