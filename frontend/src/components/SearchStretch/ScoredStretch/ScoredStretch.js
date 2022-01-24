import React from "react";
import PropTypes from "prop-types";
import Map from '../../UI/Map/Map'

const SHOW_ROUTE_ZOOM = 13

function ScoredStretch({
    stretches,
    startPoint,
    endPoint,
    middlePoint = ''
}) {
    const stretch = stretches
    .find((s) => s.startPoint.id === startPoint.id && s.endPoint.id === endPoint.id && s.middlePoint === middlePoint);

    const map = <Map showMarker={false} showRoute={true}
    startName={startPoint.name}
    endName={endPoint.name}
    startLng={
        startPoint.latitude
    }
    startLat={
        startPoint.longitude
    }
    endLng={
        endPoint.latitude
    }
    endLat={
        endPoint.long
    }
    zoom={SHOW_ROUTE_ZOOM}
    labels/>


    return (
        <>
            <table className='table'>
                <thead>Szczegóły odcinka:
                </thead>
                <tbody>
                    <tr className="border_bottom">
                        <th>Punkt początkowy:</th>
                        <td>{
                            stretch.startPoint.name || '-'
                        }</td>
                    </tr>

                    <tr className="border_bottom">
                        <th>Punkt końcowy:</th>
                        <td>{
                            stretch.endPoint.name || '-'
                        }</td>
                    </tr>

                    <tr className="border_bottom">
                        <th>Punkt pośredni (przez):</th>
                        <td>{
                            stretch.middlePoint != '' ? stretch.middlePoint : '-'
                        }</td>
                    </tr>

                    <tr className="border_bottom">
                        <th>Teren górski:</th>
                        <td> {
                            stretch.mountainArea.name || '-'
                        } </td>
                    </tr>

                    <tr className="border_bottom">
                        <th>Długość:</th>
                        <td>{
                            stretch.length || 0.0
                        }km</td>
                    </tr>

                    <tr className="border_bottom">
                        <th>Przewyższenia:</th>
                        <td>{
                            stretch.heightDifference || 0.0
                        }m</td>
                    </tr>

                    <tr className="border_bottom">
                        <th>Czas przejścia:</th>
                        <td>{
                            stretch.walkingTime || 0.0
                        }</td>
                    </tr>

                    <tr className="border_bottom">
                        <th>Punkty:</th>
                        <td>{
                            stretch.score || 0.0
                        }</td>
                    </tr>
                </tbody>
            </table>
            {map}
        </>
    );
}


ScoredStretch.propTypes = {};

export default ScoredStretch;
