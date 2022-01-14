package com.example.GoToTop.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
@Table
public class RoutePoint {
    @Id
    @SequenceGenerator(
            name = "route_point_sequence",
            sequenceName = "route_point_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "route_point_sequence"
    )
    private Long id;
    private float longitude;
    private float latitude;
    private float altitude;

    @ManyToMany
    @JoinTable(
            name = "areas_of_points",
            joinColumns = @JoinColumn(name = "mountain_area_id"),
            inverseJoinColumns = @JoinColumn(name = "route_point_id"))
    Set<MountainArea> mountainAreas;

    public RoutePoint(){}

    public RoutePoint(Long id, float longitude, float latitude, float altitude, MountainArea... mountainAreas) {
        this.id = id;
        this.longitude = longitude;
        this.latitude = latitude;
        this.altitude = altitude;
        this.mountainAreas = Stream.of(mountainAreas).collect(Collectors.toSet());
        this.mountainAreas.forEach(x -> x.getRoutePoints().add(this));
    }

    public RoutePoint(float longitude, float latitude, float altitude, MountainArea... mountainAreas) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.altitude = altitude;
        this.mountainAreas = Stream.of(mountainAreas).collect(Collectors.toSet());
        this.mountainAreas.forEach(x -> x.getRoutePoints().add(this));
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getAltitude() {
        return altitude;
    }

    public void setAltitude(float altitude) {
        this.altitude = altitude;
    }

    public Set<MountainArea> getMountainAreas() {
        return mountainAreas;
    }

    public void setMountainAreas(Set<MountainArea> mountainAreas) {
        this.mountainAreas = mountainAreas;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    public Long getId() {
        return id;
    }
}
