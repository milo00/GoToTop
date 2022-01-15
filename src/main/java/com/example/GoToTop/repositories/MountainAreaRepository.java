package com.example.GoToTop.repositories;

import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.model.projection.MountainAreaProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MountainAreaRepository extends JpaRepository<MountainArea, Long> {

    @Query("SELECT a FROM MountainArea a WHERE a.name = ?1")
    Optional<MountainArea> findAreaByName(String name);

    @Query("SELECT a.id AS id, a.name AS name FROM MountainArea a")
    List<MountainAreaProjection> findAreas();
}
