package com.example.GoToTop.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
@Table
@Access(AccessType.PROPERTY)
public class MountainArea {

    private Long id;
    private String name;


    Set<RoutePoint> routePoints;

    public MountainArea() {
    }

    public MountainArea(Long id, String name) {
        this.id = id;
        this.name = name;
        this.routePoints = new HashSet<>();
    }

    public MountainArea(String name) {
        this.name = name;
        this.routePoints = new HashSet<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToMany(mappedBy = "mountainAreas")
    public Set<RoutePoint> getRoutePoints() {
        return routePoints;
    }

    public void setRoutePoints(Set<RoutePoint> routePoints) {
        this.routePoints = routePoints;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @SequenceGenerator(
            name = "mountain_area_sequence",
            sequenceName = "mountain_area_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "mountain_area_sequence"
    )
    public Long getId() {
        return id;
    }
}