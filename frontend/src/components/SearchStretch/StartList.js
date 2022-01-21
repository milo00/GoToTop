import React from 'react';
import RoutePointsList from './RoutePoints/RoutePointsList.js';

function StartList({stretches, getStartPoint}) {

  const startPoints = stretches.map(stretch => {return stretch.startPoint });
  const uniqueStartPoints = startPoints.filter( (elem, idx) => idx === startPoints.findIndex(point => point.id === elem.id));
  
  return (
    <section>
    <RoutePointsList 
        getCickedPointHandler={ (point) => getStartPoint((point))}
        points={uniqueStartPoints} 
      />
    </section> 
  );
}

export default StartList;
