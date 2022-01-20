import { useState } from 'react';
import GoToTopService from '../../api/gototop/GoToTopService.js'
import RoutePointsList from './RoutePoints/RoutePointsList.js';

function SearchStretchController() {

    const [mode, setMode] = useState([1]);

    const stretches = GoToTopService.ScoredStretchData();

    const stretchStartRoutePoints = stretches.map(stretch => {
        return stretch.startPoint;
    });



    const stretchAreas = GoToTopService.ScoredStretchData().map(stretch => {
        return stretch.mountainArea;
    });

    const [savedStartPoint, setsavedStartPoint] = useState([]);
    const [savedEndPoint, setsavedEndPoint] = useState([]);


    const saveCickedPointHandler = (point) => {

        setsavedStartPoint(point);
        const endPoints = stretches
          .filter(stretch => stretch.startPoint.id === point.id)
          .map(filteredStretch => {return filteredStretch.endPoint});
          console.log(endPoints);
          
      };

      const saveCickedAreaHandler = (area) => {

        //setsavedStartPoint(point);
        const startPoints = stretches
          .filter(stretch => stretch.mountainArea.id === area.id)
          .map(filteredStretch => {return filteredStretch.startPoint});
          console.log(startPoints);
          
      };

      let content; 
      switch (mode) {
        case 2:
            //list = 
        case 3:
            break;
        default:          
            content = <RoutePointsList 
            getCickedPointHandler={saveCickedPointHandler}
            points={stretchStartRoutePoints} />
            break;
    }           
        

    return (
        
        <div>
            content
        </div>
    )        
    
}


export default SearchStretchController;