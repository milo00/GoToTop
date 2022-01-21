import React from "react";
import PropTypes from "prop-types";
import findDistance from '../../../utils/findDistance.js'


function ScoredStretch({stretches, startPoint, endPoint}) {
    const stretch = stretches.find((s) => s.startPoint.id === startPoint.id && s.endPoint.id === endPoint.id);

    
    return (
        <table className='table'>
          <tbody>
            <tr>
                <th>start point:</th>
                <td>{
                    stretch.startPoint.name || '-'
                }</td>
            </tr>

            <tr>
                <th>end point:</th>
                <td>{
                    stretch.endPoint.name || '-'
                }</td>
            </tr>

            <tr>
                <th>middle point:</th>
                <td>{
                    stretch.middlePoint.name || stretch.middlePoint.name == '' ? stretch.middlePoint.name : '-'
                }</td>
            </tr>

            <tr>
                <th>mountain area:</th>
                <td>
                  {stretch.mountainArea.name || '-'} 
                </td>
            </tr>

            <tr>
                <th>distance:</th>
                <td>{
                    stretch.length || 0.0
                }</td>
            </tr>

            <tr>
                <th>height difference:</th>
                <td>{
                    stretch.heightDifference || 0.0
                }</td>
            </tr>

            <tr>
                <th>walking time:</th>
                <td>{
                    stretch.walkingTime || 0.0
                }</td>
            </tr>

            <tr>
                <th>score:</th>
                <td>{
                    stretch.score || 0.0
                }</td>
            </tr>
            </tbody>
        </table>
    );
}


ScoredStretch.propTypes = {};

export default ScoredStretch;
