package com.example.GoToTop.config;

import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.repositories.MountainAreaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class MountainAreaConfig {

    //  @Bean
    CommandLineRunner commandLineRunnerMountainAreas(MountainAreaRepository repository) {
        return args -> repository.saveAll(List.of(
                new MountainArea("Tatry Wysokie"),
                new MountainArea("Tatry Zachodnie"),
                new MountainArea("Podtatrze"),
                new MountainArea("Beskid Śląski "),
                new MountainArea("Beskid Żywiecki"),
                new MountainArea("Beskid Mały"),
                new MountainArea("Beskid Średni"),
                new MountainArea("Gorce"),
                new MountainArea("Beskid Wyspowy"),
                new MountainArea("Orawa"),
                new MountainArea("Spisz i Pininy"),
                new MountainArea("Podgórze Wielickie"),
                new MountainArea("Podgórze Wiśnieckie"),
                new MountainArea("Podgórze Rożanowskie"),
                new MountainArea("Karkonosze"),
                new MountainArea("Bieszczady")
        ));
    }
}
