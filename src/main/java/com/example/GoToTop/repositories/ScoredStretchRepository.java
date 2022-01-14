package com.example.GoToTop.repositories;

import com.example.GoToTop.model.RoutePoint;
import com.example.GoToTop.model.ScoredStretch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ScoredStretchRepository extends JpaRepository<ScoredStretch, Long> {

    @Query("SELECT a FROM ScoredStretch a WHERE a.startPoint = ?1 AND a.endPoint = ?2 AND a.middlePoint = ?3")
    Optional<ScoredStretch> findStretchByKey(RoutePoint startPoint, RoutePoint endPoint, String middlePoint);
}