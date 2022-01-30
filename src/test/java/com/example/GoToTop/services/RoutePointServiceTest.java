package com.example.GoToTop.services;

import com.example.GoToTop.exceptions.MountainAreaAlreadyExistsException;
import com.example.GoToTop.exceptions.RoutePointAlreadyExistsException;
import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.model.RoutePoint;
import com.example.GoToTop.repositories.MountainAreaRepository;
import com.example.GoToTop.repositories.RoutePointRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class RoutePointServiceTest {

    @Mock
    private RoutePointRepository routePointRepository;


    private RoutePointService underTest;

    @BeforeEach
    void setUp() {
        underTest = new RoutePointService(routePointRepository);
    }

    @Test
    void existsByName() {
        String name = "Rusionowa Polana";
        underTest.existsByName(name);
        verify(routePointRepository).existsByName(name);
    }

    @Test
    void getRoutePoints() {
        underTest.getRoutePoints();
        verify(routePointRepository).findAllRoutes();
    }

    @Test
    void addNewRoutePoint() {

        MountainArea mountainArea = new MountainArea("Tatry Wysokie");

        RoutePoint routePoint = new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210, mountainArea);

        underTest.addNewRoutePoint(routePoint);


        ArgumentCaptor<RoutePoint> routePointArgumentCaptor =
                ArgumentCaptor.forClass(RoutePoint.class);

        verify(routePointRepository)
                .save(routePointArgumentCaptor.capture());

        RoutePoint capturedRoutePoint = routePointArgumentCaptor.getValue();

        assertThat(capturedRoutePoint).isEqualTo(routePoint);

    }

    @Test
    void willThrowWhenNameIsTaken() {

        MountainArea mountainArea = new MountainArea("Tatry Wysokie");

        RoutePoint routePoint = new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210, mountainArea);


        given(routePointRepository.findByName(anyString())).willReturn(Optional.of(routePoint));

        assertThatThrownBy(() -> underTest.addNewRoutePoint(routePoint))
                .isInstanceOf(RoutePointAlreadyExistsException.class)
                .hasMessageContaining("route point with name " + routePoint.getName() + " already exist");

        verify(routePointRepository, never()).save(any());

    }
}