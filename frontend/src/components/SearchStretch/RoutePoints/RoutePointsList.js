import React from "react";

import RoutePoint from "./RoutePoint.js";

const RoutePointsList = ({points, getCickedPointHandler}) => {

  
 
  return (
    <ul className="list__scrollable">
      {points.map((point) => (
        <RoutePoint
          key={point.id}
          point={point}
          onPointClickHandler={(point) => getCickedPointHandler(point)}
        />
      ))}
    </ul>
  );
};

export default RoutePointsList;
