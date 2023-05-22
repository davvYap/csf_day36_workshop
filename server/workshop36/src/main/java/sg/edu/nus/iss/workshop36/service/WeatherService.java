package sg.edu.nus.iss.workshop36.service;

import javax.print.DocFlavor.STRING;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    private final String WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

    public ResponseEntity<String> getWeather(String city, String units) {
        String url = UriComponentsBuilder.fromUriString(WEATHER_API_URL)
                .queryParam("appid", apiKey)
                .queryParam("units", units)
                .queryParam("q", city.replaceAll(" ", "+"))
                .build().toUriString();

        RequestEntity req = RequestEntity.get(url)
                .accept(MediaType.APPLICATION_JSON)
                .build();

        RestTemplate template = new RestTemplate();

        ResponseEntity<String> response = null;

        try {
            response = template.exchange(req, String.class);
        } catch (RestClientException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        return response;
    }

}
