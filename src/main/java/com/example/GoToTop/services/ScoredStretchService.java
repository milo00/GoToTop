package com.example.GoToTop.services;

import com.example.GoToTop.exceptions.MountainAreaNotFoundException;
import com.example.GoToTop.exceptions.ScoredStretchAlreadyExistsException;
import com.example.GoToTop.exceptions.ScoredStretchConflictException;
import com.example.GoToTop.exceptions.ScoredStretchNotFoundException;
import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.model.RoutePoint;
import com.example.GoToTop.model.ScoredStretch;
import com.example.GoToTop.model.projection.ScoredStretchProjection;
import com.example.GoToTop.repositories.ScoredStretchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.util.List;
import java.util.Optional;

@Service
public class ScoredStretchService {
    private final ScoredStretchRepository scoredStretchRepository;

    @Autowired
    private final MountainAreaService mountainAreaService;

    public ScoredStretchService(ScoredStretchRepository scoredStretchRepository, MountainAreaService mountainAreaService) {
        this.scoredStretchRepository = scoredStretchRepository;
        this.mountainAreaService = mountainAreaService;
    }

    public List<ScoredStretchProjection> getScoredStretch() {
        return scoredStretchRepository.findAllStretches();
    }

    public void addNewScoredStretch(ScoredStretch scoredStretch) {
        if (scoredStretch.getMountainArea() == null) {
            throw new MountainAreaNotFoundException("Points does not have the same mountain area");
        }


        Optional<ScoredStretch> scoredStretchByKey = scoredStretchRepository.findStretchByKey(scoredStretch.getStartPoint(),
                scoredStretch.getEndPoint(), scoredStretch.getMiddlePoint());
        if (scoredStretchByKey.isPresent()) {
            throw new ScoredStretchAlreadyExistsException("Stretch with given name already exists");
        } else if (scoredStretch.getMiddlePoint().isBlank()
                && (scoredStretchRepository.countScoredStretchesWithTheSameStartAndEndPoint(scoredStretch.getStartPoint(), scoredStretch.getEndPoint()) > 1)) {
            throw new ScoredStretchConflictException("Cannot add new stretch with empty middle point if different middle point for this stretch already exists");
        } else if (scoredStretchRepository.countScoredStretchesWithTheSameStartAndEndPoint(scoredStretch.getStartPoint(), scoredStretch.getEndPoint()) == 1) {
            throw new ScoredStretchConflictException("Cannot add new stretch if the same stretch with empty middle point exists");
        } else {
            scoredStretchRepository.save(scoredStretch);
        }
    }

    public void deleteScoredStretch(Long id) {
        Optional<ScoredStretch> scoredStretchById = scoredStretchRepository.findById(id);
        if (scoredStretchById.isEmpty()) {
            throw new ScoredStretchNotFoundException("Stretch does not exist");
        }
        scoredStretchRepository.delete(scoredStretchById.get());
    }

    public void deleteScoredStretch(RoutePoint startPoint, RoutePoint endPoint, String middlePoint) {
        Optional<ScoredStretch> scoredStretchById = scoredStretchRepository.findStretchByKey(startPoint,
                endPoint, middlePoint);
        if (scoredStretchById.isEmpty()) {
            throw new ScoredStretchNotFoundException("Stretch does not exist");
        }
        scoredStretchRepository.delete(scoredStretchById.get());
    }

    @Transactional
    public void updateScoredStretch(Long id, Optional<String> middlePoint, Optional<Integer> score, Optional<Float> length,
                                    Optional<Float> heightDifference, Optional<Time> walkingTime) {
        Optional<ScoredStretch> scoredStretchById = scoredStretchRepository.findById(id);
        if (scoredStretchById.isEmpty()) {
            throw new ScoredStretchNotFoundException("Stretch does not exist");
        } else {

            ScoredStretch scoredStretchToUpdate = scoredStretchById.get();

            if (middlePoint.isPresent() && !middlePoint.get().equals(scoredStretchToUpdate.getMiddlePoint())) {
                RoutePoint startPoint = scoredStretchToUpdate.getStartPoint();
                RoutePoint endPoint = scoredStretchToUpdate.getEndPoint();
                Optional<ScoredStretch> scoredStretchByKey = scoredStretchRepository.findStretchByKey(startPoint,
                        endPoint, middlePoint.get());
                if (scoredStretchByKey.isPresent()) {
                    throw new ScoredStretchAlreadyExistsException("Stretch with given name already exists");
                } else if (middlePoint.get().isBlank()
                        && (scoredStretchRepository.countScoredStretchesWithTheSameStartAndEndPoint(startPoint, endPoint) > 1)) {
                    throw new ScoredStretchConflictException("Cannot delete middle point if different middle point for the stretch still exists");
                } else {
                    scoredStretchToUpdate.setMiddlePoint(middlePoint.get());
                }
            }

            if (score.isPresent() && !score.get().equals(scoredStretchToUpdate.getScore())) {
                scoredStretchToUpdate.setScore(score.get());
            }

            if (length.isPresent() && !length.get().equals(scoredStretchToUpdate.getLength())) {
                scoredStretchToUpdate.setLength(length.get());
            }

            if (heightDifference.isPresent() && !heightDifference.get().equals(scoredStretchToUpdate.getHeightDifference())) {
                scoredStretchToUpdate.setHeightDifference(heightDifference.get());
            }

            if (walkingTime.isPresent() && !walkingTime.get().equals(scoredStretchToUpdate.getWalkingTime())) {
                scoredStretchToUpdate.setWalkingTime(walkingTime.get());
            }
        }
    }

}
