package com.example.GoToTop.repositories;

import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.model.RoutePoint;
import com.example.GoToTop.model.projection.RoutePointProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RoutePointRepository extends JpaRepository<RoutePoint, Long> {
    Optional<RoutePoint> findByName(String name);

    @Query("SELECT a FROM RoutePoint a")
    List<RoutePointProjection> findAllRoutes();

    boolean existsByName(String name);
}
