package com.example.GoToTop.repositories;

import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.model.RoutePoint;
import com.example.GoToTop.model.ScoredStretch;
import org.aspectj.lang.annotation.After;
import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.sql.Time;
import java.util.List;
import java.util.Optional;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class ScoredStretchRepositoryTest {

    @Autowired
    private ScoredStretchRepository underTest;

    @Autowired
    private RoutePointRepository routePointRepository;

    @Autowired
    private MountainAreaRepository mountainAreaRepository;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void findStretchWithExistingKeyTest() {

        mountainAreaRepository.save(new MountainArea("Tatry Wysokie"));

        RoutePoint startPoint = new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210, mountainAreaRepository.findByName("Tatry Wysokie").get());
        RoutePoint endPoint = new RoutePoint("Dolina Filipka", 49.282190f, 20.087708f, 959, mountainAreaRepository.findByName("Tatry Wysokie").get());
        String middlePoint = "";
        routePointRepository.saveAll(List.of(startPoint,endPoint));

        ScoredStretch scoredStretch = new ScoredStretch(routePointRepository.findByName("Rusinowa Polana").get(),
                routePointRepository.findByName("Dolina Filipka").get(), middlePoint, 3, 2.7f,
                Time.valueOf("00:55:00"));
        underTest.save(scoredStretch);

        Optional<ScoredStretch> expected = underTest.findStretchByKey(startPoint, endPoint, middlePoint);

        assertThat(expected).isPresent();

    }

    @Test
    void findStretchWitNotExistingKeyTest() {

        mountainAreaRepository.save(new MountainArea("Tatry Wysokie"));

        RoutePoint startPoint = new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210, mountainAreaRepository.findByName("Tatry Wysokie").get());
        RoutePoint endPoint = new RoutePoint("Dolina Filipka", 49.282190f, 20.087708f, 959, mountainAreaRepository.findByName("Tatry Wysokie").get());
        String middlePoint = "";
        routePointRepository.saveAll(List.of(startPoint,endPoint));

        Optional<ScoredStretch> expected = underTest.findStretchByKey(startPoint, endPoint, middlePoint);
        assertThat(expected).isEmpty();
    }

    @Test
    void countScoredStretchesWithTheSameStartAndEndPointTest() {
        mountainAreaRepository.save(new MountainArea("Tatry Wysokie"));

        RoutePoint startPoint = new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210, mountainAreaRepository.findByName("Tatry Wysokie").get());
        RoutePoint endPoint = new RoutePoint("Dolina Filipka", 49.282190f, 20.087708f, 959, mountainAreaRepository.findByName("Tatry Wysokie").get());
        String middlePoint1 = "md1";
        String middlePoint2 = "md2";
        routePointRepository.saveAll(List.of(startPoint,endPoint));

        ScoredStretch scoredStretch1 = new ScoredStretch(routePointRepository.findByName("Rusinowa Polana").get(),
                routePointRepository.findByName("Dolina Filipka").get(), middlePoint1, 3, 2.7f,
                Time.valueOf("00:55:00"));
        ScoredStretch scoredStretch2 = new ScoredStretch(routePointRepository.findByName("Rusinowa Polana").get(),
                routePointRepository.findByName("Dolina Filipka").get(), middlePoint2, 3, 2.7f,
                Time.valueOf("00:55:00"));
        underTest.saveAll(List.of(scoredStretch1, scoredStretch2));

        int howMany = underTest.countScoredStretchesWithTheSameStartAndEndPoint(startPoint,endPoint);
        assertThat(howMany).isEqualTo(2);

    }

    @Test
    void noScoredStretchesWithTheSameStartAndEndPointTest() {
        mountainAreaRepository.save(new MountainArea("Tatry Wysokie"));

        RoutePoint startPoint = new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210, mountainAreaRepository.findByName("Tatry Wysokie").get());
        RoutePoint endPoint = new RoutePoint("Dolina Filipka", 49.282190f, 20.087708f, 959, mountainAreaRepository.findByName("Tatry Wysokie").get());
        routePointRepository.saveAll(List.of(startPoint,endPoint));

        int howMany = underTest.countScoredStretchesWithTheSameStartAndEndPoint(startPoint,endPoint);
        assertThat(howMany).isEqualTo(0);

    }
}