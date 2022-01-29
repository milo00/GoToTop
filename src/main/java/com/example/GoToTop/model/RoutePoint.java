package com.example.GoToTop.model;

import javax.persistence.*;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
@Table
public class RoutePoint {

    private Long id;
    private String name;
    private float longitude;
    private float latitude;
    private float altitude;
    private Set<MountainArea> mountainAreas;

    public RoutePoint() {
    }

    public RoutePoint(Long id, String name, float latitude, float longitude, float altitude, MountainArea... mountainAreas) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.mountainAreas = Stream.of(mountainAreas).collect(Collectors.toSet());
    }

    public RoutePoint(String name, float latitude, float longitude, float altitude, MountainArea... mountainAreas) {
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
        this.altitude = altitude;
        this.mountainAreas = Stream.of(mountainAreas).collect(Collectors.toSet());
    }

    @Column(unique = true)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    @ManyToMany
    @JoinTable(
            name = "areas_of_points",
            joinColumns = @JoinColumn(name = "mountain_area_id"),
            inverseJoinColumns = @JoinColumn(name = "route_point_id"))
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
    @SequenceGenerator(
            name = "route_point_sequence",
            sequenceName = "route_point_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "route_point_sequence"
    )
    public Long getId() {
        return id;
    }

    @Override
    public String toString() {
        return "RoutePoint{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", longitude=" + longitude +
                ", latitude=" + latitude +
                ", altitude=" + altitude +
                ", mountainAreas=" + mountainAreas +
                '}';
    }
}
