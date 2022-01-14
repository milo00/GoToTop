package com.example.GoToTop.config;

import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.repositories.MountainAreaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class MountainAreaConfig {

//    @Bean
    CommandLineRunner commandLineRunner(MountainAreaRepository repository) {
        return args -> {
            MountainArea tatryWysokie = new MountainArea(
                    "Tatry Wysokie"
            );
            MountainArea tatryZachodnie = new MountainArea(
                    "Tatry Zachodnie"
            );
            MountainArea podtatrze = new MountainArea(
                    "Podtatrze"
            );
            MountainArea beskidŚląski = new MountainArea(
                    "Beskid Śląski "
            );
            MountainArea beskidŻywiecki = new MountainArea(
                    "Beskid Żywiecki"
            );
            MountainArea beskidMały = new MountainArea(
                    "Beskid Mały"
            );
            MountainArea beskidŚredni = new MountainArea(
                    "Beskid Średni"
            );
            MountainArea gorce = new MountainArea(
                    "Gorce"
            );
            MountainArea beskidWyspowy = new MountainArea(
                    "Beskid Wyspowy"
            );
            MountainArea orawa = new MountainArea(
                    "Orawa"
            );
            MountainArea spiszIPininy = new MountainArea(
                    "Spisz i Pininy"
            );
            MountainArea podgórzeWielickie = new MountainArea(
                    "Podgórze Wielickie"
            );
            MountainArea podgórzeWiśnieckie = new MountainArea(
                    "Podgórze Wiśnieckie"
            );
            MountainArea podgórzeRożanowskie = new MountainArea(
                    "Podgórze Rożanowskie"
            );

            repository.saveAll(List.of(tatryWysokie, tatryZachodnie, podtatrze, beskidŚląski, beskidMały, beskidŚląski,
                    gorce, beskidWyspowy, orawa, spiszIPininy, podgórzeWielickie, podgórzeWiśnieckie, podgórzeRożanowskie
            ));
        };

    }


}
