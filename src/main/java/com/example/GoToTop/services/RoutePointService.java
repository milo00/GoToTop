package com.example.GoToTop.services;

import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.model.RoutePoint;
import com.example.GoToTop.model.projection.RoutePointProjection;
import com.example.GoToTop.repositories.RoutePointRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RoutePointService {

    private final RoutePointRepository routePointRepository;


    public RoutePointService(RoutePointRepository routePointRepository) {
        this.routePointRepository = routePointRepository;
    }

    public boolean existsByName(String name){
        return routePointRepository.existsByName(name);
    }

    public List<RoutePointProjection> getRoutePoints() {return routePointRepository.findAllRoutes();}

    public void addNewRoutePoint(RoutePoint routePoint) {
        Optional<RoutePoint> routePointByName = routePointRepository.findByName(routePoint.getName());
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

    @Transactional
    public void updateRoutePoint(Long id, Optional<Float> longitude, Optional<Float> latitude, Optional<Float> altitude,
                                 Optional<Set<MountainArea>> mountainAreas) {
        Optional<RoutePoint> routePointById = routePointRepository.findById(id);
        if (routePointById.isEmpty()) {
            throw new IllegalStateException("route does not exist");
        }else {
            RoutePoint routePointToUpdate = routePointById.get();
            if(longitude.isPresent()&& longitude.get()!=routePointToUpdate.getLongitude() && longitude.get() > 0){
                routePointToUpdate.setLongitude(longitude.get());
            }
            if(latitude.isPresent()&& latitude.get()!=routePointToUpdate.getLatitude() && latitude.get() > 0){
                routePointToUpdate.setLatitude(latitude.get());
            }
            if(altitude.isPresent()&& altitude.get()!=routePointToUpdate.getAltitude() && altitude.get() > 0){
                routePointToUpdate.setAltitude(altitude.get());
            }

            if(mountainAreas.isPresent() && mountainAreas.get().size()>0){
                routePointToUpdate.setMountainAreas(mountainAreas.get());
            }
        }
    }
}
