package com.example.GoToTop.repositories;

import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.model.RoutePoint;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class RoutePointRepositoryTest {

    @Autowired
    private RoutePointRepository underTest;

    @Autowired
    private MountainAreaRepository mountainAreaRepository;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
        mountainAreaRepository.deleteAll();
    }

    @Test
    void checkIfRoutePointWithNameExistsTest() {

        mountainAreaRepository.save(new MountainArea("Tatry Wysokie"));

        String name = "Rusinowa Polana";
        RoutePoint routePoint = new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210,
                mountainAreaRepository.findByName("Tatry Wysokie").get());

        underTest.save(routePoint);

        boolean expected = underTest.existsByName(name);

        assertThat(expected).isTrue();
    }

    @Test
    void checkIfRoutePointWithNameNotExistsTest() {

        String name = "Rusinowa Polana";

        boolean expected = underTest.existsByName(name);

        assertThat(expected).isFalse();
    }

    @Test
    void findRoutePointWithExistingNameTest() {

        mountainAreaRepository.save(new MountainArea("Tatry Wysokie"));

        String name = "Rusinowa Polana";
        RoutePoint routePoint = new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210,
                //already validated
                mountainAreaRepository.findByName("Tatry Wysokie").get());

        underTest.save(routePoint);

        Optional<RoutePoint> expected = underTest.findByName(name);

        assertThat(expected).isPresent();
    }

    @Test
    void findRoutePointWithNotExistingNameTest() {

        String name = "Rusinowa Polana";

        Optional<RoutePoint> expected = underTest.findByName(name);

        assertThat(expected).isEmpty();
    }

}