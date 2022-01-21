import React from "react";
import PropTypes from "prop-types";
import findDistance from '../../../utils/findDistance.js'



function ScoredStretch({ stretches, startPoint, endPoint }) {
  const stretch = stretches.find(
    (s) => s.startPoint.id === startPoint.id && s.endPoint.id === endPoint.id
  );

  const startLong=  parseFloat(stretch.startPoint.longitude);
  const endLong=  parseFloat(stretch.endPoint.longitude);
  const startLat= parseFloat(stretch.startPoint.latitude);
  const endLat = parseFloat(stretch.endPoint.latitude);  

  console.log(stretch);
  

  const distance = findDistance(startLong,endLong,startLat,endLat
  );

  return (
    <div>
      <p>start point: {stretch.startPoint.name}</p>
      <p>end point: {stretch.endPoint.name}</p>
      <p>middle point {stretch.middlePoint}</p>
      <p>distance: {stretch.length}</p>
      <p></p>
    </div>
  );
}



ScoredStretch.propTypes = {};

export default ScoredStretch;
