import React from 'react';
import RoutePoint from './RoutePoints/RoutePoint';
import Map from '../UI/Map/Map'

const SHOW_MARK_ZOOM = 13;

function EndList({stretches, getPointProps, startPoint}) {
    
    const filteredStretches = stretches.filter(stretch => {
        return stretch.startPoint.id === startPoint.id
    });
   
    let map = <Map 
    startName={startPoint.name}
    showMarker={true}
    showRoute={false}
    startLng={startPoint.latitude}
    startLat={startPoint.longitude}
    zoom={SHOW_MARK_ZOOM}/>

    return(
    <> 
        <ul className="list__scrollable">
            {filteredStretches.map((s) => (
                <RoutePoint
                key={s.id}
                point={s.endPoint}
                middlePoint={s.middlePoint}
                onPointClickHandler={(point, middlePoint) => getPointProps(point, middlePoint)}
                />
            ))}
        </ul>
        {map} 
    </>
    );
}

export default EndList;
