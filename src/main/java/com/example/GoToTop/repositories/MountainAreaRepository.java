package com.example.GoToTop.repositories;

import com.example.GoToTop.model.MountainArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MountainAreaRepository extends JpaRepository<MountainArea, Long> {

    @Query("SELECT a FROM MountainArea a WHERE a.name = ?1")
    Optional<MountainArea> findAreaByName(String name);

}
