import React from "react";

import RoutePoint from "./RoutePoint.js";

const RoutePointsList = ({points, getCickedPointHandler}) => {
  /*const getCickedPointIdHandler = (point) => {
    console.log(point)
    //onChangeView(point)
  };
  */

  return (
    <ul>
      {points.map((point) => (
        <RoutePoint
          key={point.id}
          point={point}
          onPointClickHandler={() =>getCickedPointHandler(point)}
        />
      ))}
    </ul>
  );
};

export default RoutePointsList;
