package com.example.GoToTop.services;

import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.model.RoutePoint;
import com.example.GoToTop.repositories.RoutePointRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RoutePointService {

    private final RoutePointRepository routePointRepository;


    public RoutePointService(RoutePointRepository routePointRepository) {
        this.routePointRepository = routePointRepository;
    }

    public List<RoutePoint> getRoutePoints() {return routePointRepository.findAll();}

    public void addNewRoutePoint(RoutePoint routePoint) {
        Optional<RoutePoint> routePointByName = routePointRepository.findRouteByName(routePoint.getName());
        if (routePointByName.isPresent()) {
            throw new IllegalStateException("route with given name already exist");
        }
        routePointRepository.save(routePoint);
    }

    public void deleteRoutePoint(Long id) {
        Optional<RoutePoint> routePointById = routePointRepository.findById(id);
        if (routePointById.isEmpty()) {
            throw new IllegalStateException("route does not exist");
        }
        routePointRepository.delete(routePointById.get());
    }

}
