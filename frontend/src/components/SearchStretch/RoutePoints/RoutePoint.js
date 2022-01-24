import Card from '../../UI/Card';
import React from 'react';
import './RoutePoint.css';

const RoutePoint = ({point, middlePoint, onPointClickHandler}) => {
    
  console.log(point);
  console.log(middlePoint);

  return (
    <Card className='list-elem'>
        <li className='list-elem__name' onClick={ () => onPointClickHandler(point, middlePoint)}>
            <p>{(middlePoint != null && middlePoint != '') ? point.name + " (przez " + middlePoint  + ") ": point.name}</p>
        </li>      
    </Card>
  );
};

export default RoutePoint;