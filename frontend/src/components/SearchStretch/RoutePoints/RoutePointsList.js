import React from "react";

import RoutePoint from "./RoutePoint.js";

const RoutePointsList = ({points, getCickedPointHandler}) => {
  /*const getCickedPointIdHandler = (point) => {
    console.log(point)
    //onChangeView(point)
  };
  */

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
