import React from 'react';
import RoutePoint from './RoutePoints/RoutePoint';
import Map from '../UI/Map/Map'

const SHOW_MARK_ZOOM = 13;

function EndList({stretches, getPointProps, startPoint}) {


    
    const filteredStretches = stretches.filter(stretch => {
        return stretch.startPoint.id === startPoint.id
    });

    console.log(filteredStretches);
    //const dictionary = filteredStretches.reduce((arr,stretch) => ({...arr, [stretch.middlePoint]: stretch.endPoint}), {})
    const dictionary = Object.assign({}, ...filteredStretches.map((x) => ({[x.endPoint.id]: x.middlePoint})));

    console.log(Object.values(dictionary));
    //const uniqueEndPoints = endPoints.filter((elem, idx) => idx === endPoints.findIndex(point => point.id === elem.id));

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
