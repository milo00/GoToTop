package com.example.GoToTop.model;

import javax.persistence.*;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
@Table
public class MountainArea {
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
    private Long id;
    private String name;

    @ManyToMany
    @JoinTable(
            name = "areas_of_points",
            joinColumns = @JoinColumn(name = "mountain_area_id"),
            inverseJoinColumns = @JoinColumn(name = "route_point_id"))
    Set<RoutePoint> routePoints;

    public MountainArea() {
    }

    public MountainArea(Long id, String name, RoutePoint... routePoints) {
        this.id = id;
        this.name = name;
        this.routePoints = Stream.of(routePoints).collect(Collectors.toSet());
        this.routePoints.forEach(x -> x.getMountainAreas().add(this));
    }

    public MountainArea(String name, RoutePoint... routePoints) {
        this.name = name;
        this.routePoints = Stream.of(routePoints).collect(Collectors.toSet());
        this.routePoints.forEach(x -> x.getMountainAreas().add(this));
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @javax.persistence.Id
    public Long getId() {
        return id;
    }
}