import Card from '../../UI/Card';
import React from 'react';
import './RoutePoint.css';

const RoutePoint = ({point, onPointClickHandler}) => {
    

  return (
    <Card className='list-elem'>
        <li className='list-elem__name' onClick={ () => onPointClickHandler(point)}>
            <p>{point.name}</p>
        </li>      
    </Card>
  );
};

export default RoutePoint;