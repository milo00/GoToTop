import React from 'react';
import RoutePointsList from './RoutePoints/RoutePointsList.js';
import Map from './Map/Map'

function EndList({stretches, getEndPoint, startPoint}) {


    console.log(startPoint.id);
    const endPoints = stretches.filter(stretch => {
        return stretch.startPoint.id === startPoint.id
    }).map(s => s.endPoint);
    const uniqueEndPoints = endPoints.filter((elem, idx) => idx === endPoints.findIndex(point => point.id === elem.id));


    console.log('long' + startPoint.longitude);
    console.log('lat' + startPoint.latitude);
    let map = <Map 
    startName={startPoint.name}
    showMarker='true'
    showRoute='false'
    startLng={
        startPoint.latitude
    }
    startLat={
        startPoint.longitude
    }
    zoom={15}/>
    return(<> <RoutePointsList className='list__scrollable'
                getCickedPointHandler={
                    (point) => getEndPoint((point))}
points = {
    uniqueEndPoints
} /> {
    map
} < />
    );
}

export default EndList;
