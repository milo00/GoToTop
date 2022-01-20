package com.example.GoToTop.config;

import com.example.GoToTop.model.RoutePoint;
import com.example.GoToTop.model.ScoredStretch;
import com.example.GoToTop.repositories.MountainAreaRepository;
import com.example.GoToTop.repositories.RoutePointRepository;
import com.example.GoToTop.repositories.ScoredStretchRepository;
import com.example.GoToTop.repositories.ScoredStretchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.sql.Time;
import java.util.List;

@Configuration
public class ScoredStretchConfig {

    MountainAreaRepository mountainAreaRepository;
    RoutePointRepository routePointRepository;

    @Autowired
    public ScoredStretchConfig(MountainAreaRepository mountainAreaRepository, RoutePointRepository routePointRepository) {
        this.mountainAreaRepository = mountainAreaRepository;
        this.routePointRepository = routePointRepository;
    }

  //  @Bean
    CommandLineRunner commandLineRunnerScoredStretch(ScoredStretchRepository repository) {
        return args -> repository.saveAll(List.of(
                new ScoredStretch(routePointRepository.findByName("Rusinowa Polana").get(),
                        routePointRepository.findByName("Dolina Filipka").get(), "", 3, 2.7f,
                        Time.valueOf("00:55:00")),
                new ScoredStretch(routePointRepository.findByName("Dolina Filipka").get(),
                        routePointRepository.findByName("Rusinowa Polana").get(), "", 6, 2.7f,
                        Time.valueOf("01:20:00")),
                new ScoredStretch(routePointRepository.findByName("Gęsia Szyja").get(),
                        routePointRepository.findByName("Rusinowa Polana").get(), "", 1, 1.3f,
                        Time.valueOf("00:20:00")),
                new ScoredStretch(routePointRepository.findByName("Rusinowa Polana").get(),
                        routePointRepository.findByName("Gęsia Szyja").get(), "", 4, 1.3f,
                        Time.valueOf("00:50:00")),
                new ScoredStretch(routePointRepository.findByName("Przełęcz pod Śnieżką").get(),
                        routePointRepository.findByName("Śnieżka").get(), "Droga Przyjaźni Polsko-Czeskiej",
                        3, 1.4f, Time.valueOf("00:45:00")),
                new ScoredStretch(routePointRepository.findByName("Śnieżka").get(),
                        routePointRepository.findByName("Przełęcz pod Śnieżką").get(), "Droga Przyjaźni Polsko-Czeskiej",
                        1, 1.4f, Time.valueOf("00:23:00")),
                new ScoredStretch(routePointRepository.findByName("Śnieżka").get(),
                        routePointRepository.findByName("Przełęcz pod Śnieżką").get(), "Droga Jubileuszowa",
                        2, 1.8f, Time.valueOf("00:28:00")),
                new ScoredStretch(routePointRepository.findByName("Przełęcz pod Śnieżką").get(),
                        routePointRepository.findByName("Śnieżka").get(), "Droga Jubileuszowa",
                        3, 1.8f, Time.valueOf("00:50:00")),
                new ScoredStretch(routePointRepository.findByName("Połonina Wetlińska").get(),
                        routePointRepository.findByName("Wetlina").get(), "", 4, 10.1f,
                        Time.valueOf("03:07:00")),
                new ScoredStretch(routePointRepository.findByName("Wetlina").get(),
                        routePointRepository.findByName("Połonina Wetlińska").get(), "", 10, 10.1f,
                        Time.valueOf("03:42:00")),
                new ScoredStretch(routePointRepository.findByName("Połonina Wetlińska").get(),
                        routePointRepository.findByName("Przełęcz Orłowicza").get(), "", 3, 6.6f,
                        Time.valueOf("02:15:00")),
                new ScoredStretch(routePointRepository.findByName("Przełęcz Orłowicza").get(),
                        routePointRepository.findByName("Połonina Wetlińska").get(), "", 5, 6.6f,
                        Time.valueOf("02:05:00")),
                new ScoredStretch(routePointRepository.findByName("Połonina Wetlińska").get(),
                        routePointRepository.findByName("Suche Rzeki").get(), "", 5, 11f,
                        Time.valueOf("03:20:00")),
                new ScoredStretch(routePointRepository.findByName("Suche Rzeki").get(),
                        routePointRepository.findByName("Połonina Wetlińska").get(), "", 11, 11f,
                        Time.valueOf("04:00:00")),
                new ScoredStretch(routePointRepository.findByName("Połonina Wetlińska").get(),
                        routePointRepository.findByName("Zatwarnica").get(), "Jaworki", 8, 14.6f,
                        Time.valueOf("04:15:00")),
                new ScoredStretch(routePointRepository.findByName("Zatwarnica").get(),
                        routePointRepository.findByName("Połonina Wetlińska").get(), "Jaworki", 16, 14.6f,
                        Time.valueOf("05:10:00")),
                new ScoredStretch(routePointRepository.findByName("Połonina Wetlińska").get(),
                        routePointRepository.findByName("Schronisko PTTK na Połoninie Wetlińskiej").get(), "",
                        3, 2.2f, Time.valueOf("00:40:00")),
                new ScoredStretch(routePointRepository.findByName("Schronisko PTTK na Połoninie Wetlińskiej").get(),
                        routePointRepository.findByName("Połonina Wetlińska").get(), "", 3, 2.2f,
                        Time.valueOf("00:45:00")),
                new ScoredStretch(routePointRepository.findByName("Zatwarnica").get(),
                        routePointRepository.findByName("Suche Rzeki").get(), "", 7, 3.6f,
                        Time.valueOf("01:10:00")),
                new ScoredStretch(routePointRepository.findByName("Suche Rzeki").get(),
                        routePointRepository.findByName("Zatwarnica").get(), "", 5, 3.6f,
                        Time.valueOf("00:55:00")),
                new ScoredStretch(routePointRepository.findByName("Moczarne").get(),
                        routePointRepository.findByName("Wetlina").get(), "", 5, 3.4f,
                        Time.valueOf("00:50:00")),
                new ScoredStretch(routePointRepository.findByName("Wetlina").get(),
                        routePointRepository.findByName("Moczarne").get(), "", 6, 3.4f,
                        Time.valueOf("01:25:00")),
                new ScoredStretch(routePointRepository.findByName("Moczarne").get(),
                        routePointRepository.findByName("Mała Rawka").get(), "", 5, 5.9f,
                        Time.valueOf("02:10:00")),
                new ScoredStretch(routePointRepository.findByName("Mała Rawka").get(),
                        routePointRepository.findByName("Moczarne").get(), "", 11, 5.9f,
                        Time.valueOf("01:40:00"))));
    }
}
