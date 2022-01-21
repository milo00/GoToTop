import { useState } from 'react';
import GoToTopService from '../../api/gototop/GoToTopService.js'
import RoutePointsList from './RoutePoints/RoutePointsList.js';
import Select from 'react-select';
import useAxios from '../../utils/useAxios.js'
import Header from './Header.js';
import StartList from './StartList.js';
import classes from './SearchStretch.module.css'
import EndList from './EndList.js';
import ScoredStretch from './ScoredStretch/ScoredStretch.js';

const URI_STRETCHES = 'http://localhost:8080/scoredStretch';

function SearchStretchController() {

    const { response, error, loading } = useAxios({
        method: 'get',
        url: URI_STRETCHES});

    const [stretches, setStretches] = useState([])
    const [startPoints, setStartPoints] = useState([])
    const [endPoints, setEndPoints] = useState([])
    const [mode, setMode] = useState([1])
    const [selectedStartPoint, setSelectedStartPoint] = useState([])
    const [selectedEndPoint, setSelectedEndPoint] = useState([])

    


    const stretchStartRoutePoints = stretches.map(stretch => {
        return stretch.startPoint;
    });

    const saveEndPointHandler = (point) => {

        console.log(point);
        setSelectedEndPoint(point);
        setMode(3);

      };
      
      const saveStartPointHandler = (point) => {

        console.log(point);
        setSelectedStartPoint(point);
        setMode(2);
      };

      if (loading) {
        return (
          <section className={classes.StretchLoading}>
            <p>Loading...</p>
          </section>
        );
      }
    
      if (error) {
        return (
          <error className={classes.StretchError}>
            <p>{error}</p>
          </error>
        );
      }

      let content;
      const map = <img src={require('../../images/map.png')} alt='map'/>; 
      switch (mode) {
        case 2:
            content =
            <div><Header title = {'Choose end point'}/>
            <div>
            <EndList 
            getEndPoint={saveEndPointHandler}
            stretches={response}
            startPoint = {selectedStartPoint} />
            {map}
            </div>
            </div>
            
            break;
        case 3:
            content =
            <div><Header title = {selectedStartPoint.name + ' - ' + selectedEndPoint.name }/>
            <div>
            <ScoredStretch 
            stretches={response}
            startPoint = {selectedStartPoint}
            endPoint = {selectedEndPoint} />
            {map}
            </div>
            </div>
            break;
        default:
            content =
            <div><Header title = {'Choose start point'}/>
            <div>
            < StartList
            getStartPoint={saveStartPointHandler}
            stretches={response} />
            {map}
            </div>
            </div>
            break;
    }           
        

    return (        
        <div>            
            {content}
        </div>
    )        
    
}


export default SearchStretchController;