package com.example.GoToTop.controllers;

import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.model.RoutePoint;
import com.example.GoToTop.model.projection.RoutePointProjection;
import com.example.GoToTop.services.RoutePointService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "/routePoint")
@CrossOrigin
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
            System.out.println("dupa.");
        }
    }

    @DeleteMapping(path = "{routePointsId}")
    public void deleteRoutePoint(@PathVariable("routePointsId") Long id){
        routePointService.deleteRoutePoint(id);
    }



}
