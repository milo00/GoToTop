package com.example.GoToTop.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
@Table
@Access(AccessType.PROPERTY)
public class RoutePoint {

    private Long id;
    private float longitude;
    private float latitude;
    private float altitude;


    Set<MountainArea> mountainAreas;

    public RoutePoint(){}



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
}
