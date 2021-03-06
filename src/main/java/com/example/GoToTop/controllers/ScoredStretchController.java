package com.example.GoToTop.controllers;

import com.example.GoToTop.exceptions.MountainAreaNotFoundException;
import com.example.GoToTop.exceptions.ScoredStretchAlreadyExistsException;
import com.example.GoToTop.exceptions.ScoredStretchConflictException;
import com.example.GoToTop.exceptions.ScoredStretchNotFoundException;
import com.example.GoToTop.model.ScoredStretch;
import com.example.GoToTop.model.projection.ScoredStretchProjection;
import com.example.GoToTop.services.RoutePointService;
import com.example.GoToTop.services.ScoredStretchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/scoredStretch")
@CrossOrigin("*")
public class ScoredStretchController {

    private final ScoredStretchService scoredStretchService;
    private final RoutePointService routePointService;

    @Autowired
    public ScoredStretchController(ScoredStretchService scoredStretchService, RoutePointService routePointService) {
        this.scoredStretchService = scoredStretchService;
        this.routePointService = routePointService;
    }

    @GetMapping
    public ResponseEntity<List<ScoredStretchProjection>> getScoredStretch() {
        return new ResponseEntity<>(scoredStretchService.getScoredStretch(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity registerNewScoredStretch(@RequestBody ScoredStretch scoredStretch)
            throws ScoredStretchAlreadyExistsException, MountainAreaNotFoundException, ScoredStretchConflictException {

        if (!routePointService.existsByName(scoredStretch.getStartPoint().getName())) {
            routePointService.addNewRoutePoint(scoredStretch.getStartPoint());
        }

        if (!routePointService.existsByName(scoredStretch.getEndPoint().getName())) {
            routePointService.addNewRoutePoint(scoredStretch.getEndPoint());
        }

        scoredStretchService.addNewScoredStretch(scoredStretch);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(path = "{scoredStretchId}")
    public void deleteScoredStretch(@PathVariable("scoredStretchId") Long id) {
        scoredStretchService.deleteScoredStretch(id);
    }

    @PutMapping(path = {"{scoredStretchId}"})
    public ResponseEntity updateScoredStretch(@PathVariable("scoredStretchId") Long id,
                                              @RequestParam(required = false) String middlePoint,
                                              @RequestParam(required = false) Integer score,
                                              @RequestParam(required = false) Float length,
                                              @RequestParam(required = false) Float heightDifference,
                                              @RequestParam(required = false) Time walkingTime)
            throws ScoredStretchAlreadyExistsException, ScoredStretchNotFoundException, ScoredStretchConflictException {
        scoredStretchService.updateScoredStretch(id,
                middlePoint == null ? Optional.empty() : Optional.of(middlePoint),
                score == null ? Optional.empty() : Optional.of(score),
                length == null ? Optional.empty() : Optional.of(length),
                heightDifference == null ? Optional.empty() : Optional.of(heightDifference),
                walkingTime == null ? Optional.empty() : Optional.of(walkingTime));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
