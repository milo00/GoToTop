package com.example.GoToTop.model.projection;
import java.sql.Time;

public interface ScoredStretchProjection {
   Long getId();
   RoutePointWithoutAreaProjection getStartPoint();
   RoutePointWithoutAreaProjection getEndPoint();
   String getMiddlePoint();
   int getScore();
   float getLength();
   float getHeightDifference();
   Time getWalkingTime();
   MountainAreaProjection getMountainArea();
}
