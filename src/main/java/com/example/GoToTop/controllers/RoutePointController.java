package com.example.GoToTop.controllers;

import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.model.RoutePoint;
import com.example.GoToTop.model.projection.RoutePointProjection;
import com.example.GoToTop.services.RoutePointService;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@RestController
@RequestMapping(path = "/routePoint")
@CrossOrigin("*")
public class RoutePointController {

    private final RoutePointService routePointService;

    public RoutePointController(RoutePointService routePointService) {
        this.routePointService = routePointService;
    }
    @GetMapping
    public List<RoutePointProjection> getRoutePoints(){
        return routePointService.getRoutePoints();
    }


    @PostMapping
    public void registerNewRoutePoint(@RequestBody RoutePoint routePoint){
        try {
            routePointService.addNewRoutePoint(routePoint);
        } catch (Exception e) {
        }
    }

    @DeleteMapping(path = "{routePointsId}")
    public void deleteRoutePoint(@PathVariable("routePointsId") Long id){
        routePointService.deleteRoutePoint(id);
    }

    @PutMapping(path = "{routePointsId}")
    public void updateRoutePoint(@PathVariable("routePointsId") Long id,
                                 @RequestParam(required = false) Float longitude,
                                 @RequestParam(required = false) Float latitude,
                                 @RequestParam(required = false) Float altitude,
                                 @RequestParam(required = false) Set<MountainArea> mountainAreas) {
        routePointService.updateRoutePoint(id, longitude == null ? Optional.empty() : Optional.of(longitude),
                latitude == null ? Optional.empty() : Optional.of(latitude),
                altitude == null ? Optional.empty() : Optional.of(altitude),
                mountainAreas == null ? Optional.empty() : Optional.of(mountainAreas));
    }




}
