package com.example.GoToTop.config;

import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.model.RoutePoint;
import com.example.GoToTop.model.RoutePoint;
import com.example.GoToTop.repositories.MountainAreaRepository;
import com.example.GoToTop.repositories.RoutePointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class RoutePointsConfig {
    MountainAreaRepository mountainAreaRepository;

    @Autowired
    public RoutePointsConfig(MountainAreaRepository mountainAreaRepository) {
        this.mountainAreaRepository = mountainAreaRepository;
    }

    @Bean
    CommandLineRunner commandLineRunnerRoutePoints(RoutePointRepository repository) {
        return args -> repository.saveAll(List.of(
              //  new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210, mountainAreaRepository.findByName("Tatry Wysokie").get()),
                new RoutePoint("Dolina Filipka", 49.282190f, 20.087708f, 959, mountainAreaRepository.findByName("Tatry Wysokie").get()),
                new RoutePoint("Gęsia Szyja", 49.259054f, 20.076541f, 1489, mountainAreaRepository.findByName("Tatry Wysokie").get()),
                new RoutePoint("Psia Trawka", 49.259054f, 20.076541f, 1489, mountainAreaRepository.findByName("Tatry Wysokie").get()),
                new RoutePoint("Czarny Staw nad Morskim Okiem", 49.190374f, 20.073700f, 1583, mountainAreaRepository.findByName("Tatry Wysokie").get()),
                new RoutePoint("Siklawa", 49.212372f, 20.042302f, 1666, mountainAreaRepository.findByName("Tatry Wysokie").get()),
                new RoutePoint("Śnieżka", 50.736103f, 15.739742f, 1602, mountainAreaRepository.findByName("Karkonosze").get()),
                new RoutePoint("Przełęcz pod Śnieżką", 50.740381f, 15.724517f, 1385, mountainAreaRepository.findByName("Karkonosze").get()),
                new RoutePoint("Połonina Wetlińska", 49.150540f, 22.556300f, 1255, mountainAreaRepository.findByName("Bieszczady").get()),
                new RoutePoint("Wetlina", 49.148035f, 22.477630f, 651, mountainAreaRepository.findByName("Bieszczady").get()),
                new RoutePoint("Przełęcz Orłowicza", 49.180770f, 22.491975f, 1099, mountainAreaRepository.findByName("Bieszczady").get()),
                new RoutePoint("Suche Rzeki", 49.201962f, 22.525090f, 609, mountainAreaRepository.findByName("Bieszczady").get()),
                new RoutePoint("Zatwarnica", 49.227500f, 22.553183f, 512, mountainAreaRepository.findByName("Bieszczady").get()),
                new RoutePoint("Schronisko PTTK na Połoninie Wetlińskiej", 49.157159f, 22.549613f, 1179, mountainAreaRepository.findByName("Bieszczady").get()),
                new RoutePoint("Moczarne", 49.143195f, 22.489573f, 674, mountainAreaRepository.findByName("Bieszczady").get()),
                new RoutePoint("Mała Rawka", 49.109681f, 22.573857f, 1272, mountainAreaRepository.findByName("Bieszczady").get())));
    }
}
