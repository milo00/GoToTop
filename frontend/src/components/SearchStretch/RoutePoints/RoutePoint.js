import Card from '../../UI/Card';
import React from 'react';
import './RoutePoint.css';

const RoutePoint = ({point, onPointClickHandler}) => {
    

  return (
    <Card className='route-point'>
        <li className='route-point__name' onClick={ () => onPointClickHandler(point)}>
            <p>{point.name}</p>
        </li>      
    </Card>
  );
};

export default RoutePoint;