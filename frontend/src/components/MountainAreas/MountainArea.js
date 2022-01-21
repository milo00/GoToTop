import Card from '../UI/Card';
import React from 'react';
import './MountainArea.css';

const MoutainArea = ({area, onAreaClickHandler}) => {
    

  return (
    <Card className='list-elem'>
        <li className='list-elem__name' onClick={ () => onAreaClickHandler(area)}>
            <p>{area.name}</p>
        </li>      
    </Card>
  );
};

export default MoutainArea;