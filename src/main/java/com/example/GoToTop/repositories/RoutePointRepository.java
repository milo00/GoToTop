package com.example.GoToTop.repositories;

import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.model.RoutePoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RoutePointRepository extends JpaRepository<RoutePoint, Long> {
    @Query("SELECT a FROM RoutePoint a WHERE a.name = ?1")
    Optional<RoutePoint> findRouteByName(String name);

}
