package com.example.GoToTop.model;

import com.fasterxml.jackson.annotation.JsonCreator;

import javax.persistence.*;
import java.sql.Time;
import java.util.Optional;

@Entity
@Table(uniqueConstraints =
@UniqueConstraint(columnNames = {"start_point_id", "end_point_id", "middlePoint"}))
public class ScoredStretch {
    private Long id;
    private RoutePoint startPoint;
    private RoutePoint endPoint;
    private String middlePoint;
    private int score;
    private float length;
    private float heightDifference;
    private Time walkingTime;
    private MountainArea mountainArea;

    public ScoredStretch() {

    }

    public ScoredStretch(Long id, RoutePoint startPoint, RoutePoint endPoint, String middlePoint, int score,
                         float length, Time walkingTime) {
        Optional<MountainArea> common = findCommonArea(startPoint, endPoint);


        if (common.isEmpty()) {
            throw new IllegalArgumentException("Points does not have the same mountain area");
        }

        this.id = id;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.middlePoint = middlePoint;
        this.score = score;
        this.length = length;
        this.heightDifference = Math.abs(startPoint.getAltitude() - endPoint.getAltitude());
        this.walkingTime = walkingTime;
        this.mountainArea = common.get();
    }

    @JsonCreator
    public ScoredStretch(RoutePoint startPoint, RoutePoint endPoint, String middlePoint, int score, float length,
                         Time walkingTime) {
        Optional<MountainArea> common = findCommonArea(startPoint, endPoint);

        System.out.println(endPoint);
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.middlePoint = middlePoint;
        this.score = score;
        this.length = length;
        this.heightDifference = Math.abs(startPoint.getAltitude() - endPoint.getAltitude());
        this.walkingTime = walkingTime;
        this.mountainArea = common.isEmpty() ? null : common.get();
    }

    private Optional<MountainArea> findCommonArea(RoutePoint startPoint, RoutePoint endPoint) {
        MountainArea common;

        for (MountainArea mountainArea : startPoint.getMountainAreas()) {
            if (endPoint.getMountainAreas().contains(mountainArea)) {
                common = mountainArea;
                return Optional.of(common);
            }
        }
        return Optional.empty();
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne
    public RoutePoint getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(RoutePoint startPoint) {
        this.startPoint = startPoint;
    }

    @ManyToOne
    public RoutePoint getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(RoutePoint endPoint) {
        this.endPoint = endPoint;
    }

    public String getMiddlePoint() {
        return middlePoint;
    }

    public void setMiddlePoint(String middlePoint) {
        this.middlePoint = middlePoint;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public float getLength() {
        return length;
    }

    public void setLength(float length) {
        this.length = length;
    }

    public float getHeightDifference() {
        return heightDifference;
    }

    public void setHeightDifference(float heightDifference) {
        this.heightDifference = heightDifference;
    }

    public Time getWalkingTime() {
        return walkingTime;
    }

    public void setWalkingTime(Time walkingTime) {
        this.walkingTime = walkingTime;
    }

    @ManyToOne
    public MountainArea getMountainArea() {
        return mountainArea;
    }

    public void setMountainArea(MountainArea mountainArea) {
        this.mountainArea = mountainArea;
    }

    @Id
    @SequenceGenerator(
            name = "scored_stretch_sequence",
            sequenceName = "scored_stretch_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "scored_stretch_sequence"
    )
    public Long getId() {
        return id;
    }
}
