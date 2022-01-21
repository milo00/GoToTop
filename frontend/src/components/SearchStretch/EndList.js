import React from 'react';
import RoutePointsList from './RoutePoints/RoutePointsList.js';

function EndList({stretches, getEndPoint, startPoint}) {
    

    console.log(startPoint.id);
    const endPoints = stretches.filter(stretch => {return stretch.startPoint.id === startPoint.id}).map(s => s.endPoint);    
    const uniqueEndPoints = endPoints.filter( (elem, idx) => idx === endPoints.findIndex(point => point.id === elem.id));
    
  
  return (
    <>
    <RoutePointsList className ='list__scrollable'
        getCickedPointHandler={ (point) => getEndPoint((point))}
        points={uniqueEndPoints} 
      />
    </> 
  );
}

export default EndList;