package com.example.GoToTop.model.projection;
import java.util.Set;

public interface RoutePointProjection {

    Long getId();
    String getName();
    float getLongitude();
    float getLatitude();
    float getAltitude();
    Set<MountainAreaProjection> getMountainAreas();
}
