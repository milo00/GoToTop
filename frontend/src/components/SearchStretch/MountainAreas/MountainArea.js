import Card from '../../UI/Card';
import React from 'react';

const MoutainArea = ({area, onAreaClickHandler}) => {
    

  return (
    <Card className='route-point'>
        <li className='route-point__name' onClick={ () => onAreaClickHandler(area)}>
            <p>{area.name}</p>
        </li>      
    </Card>
  );
};

export default MoutainArea;