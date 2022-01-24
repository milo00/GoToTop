import {useState} from 'react';
import GoToTopService from '../../api/gototop/GoToTopService.js'
import RoutePointsList from './RoutePoints/RoutePointsList.js';
import Select from 'react-select';
import useAxios from '../../utils/useAxios.js'
import Header from '../UI/Header.js';
import StartList from './StartList.js';
import classes from './SearchStretch.module.css'
import EndList from './EndList.js';
import ScoredStretch from './ScoredStretch/ScoredStretch.js';

const URI_STRETCHES = 'http://localhost:8080/scoredStretch';

function SearchStretchController() {

    const {response, error, loading} = useAxios({method: 'get', url: URI_STRETCHES});

    const [mode, setMode] = useState([1])
    const [selectedStartPoint, setSelectedStartPoint] = useState([])
    const [selectedEndPoint, setSelectedEndPoint] = useState([])
    const [selectedMiddlePoint, setSelectedMiddlePoint] = useState([])

    const savePointPropsHandler = (point, middlePoint) => {

        setSelectedEndPoint(point);
        setSelectedMiddlePoint(middlePoint);
        setMode(3);
    };

    const saveStartPointHandler = (point) => {

        setSelectedStartPoint(point);
        setMode(2);

    };

    const backButtonHandler = () => {
        setMode(prevMode => prevMode - 1)
    }

    if (loading) {
        return (
            <section className={
                classes.StretchLoading
            }>
                <p>Loading...</p>
            </section>
        );
    }

    if (error) {
        return (
            <error className={
                classes.StretchError
            }>
                <p>{error}</p>
            </error>
        );
    }

    let content;
    const button = <button className='button__back' onClick={backButtonHandler}>Cofnij</button>
    switch (mode) {
        case 2: content = <>{button}<section><Header title={
                    selectedStartPoint.name
                }
                subtitle={'Wybierz punkt końcowy:'}/>
             <section className = 'search__conteiner'><EndList getPointProps={savePointPropsHandler}
                stretches={response}
                startPoint={selectedStartPoint}/> 
                
                </section></section></>

            break;
        case 3: content = <>{button}<section><Header title={
                selectedStartPoint.name + ' - ' + selectedEndPoint.name
            }/>
            <section className = 'search__conteiner'><ScoredStretch stretches={response}
                startPoint={selectedStartPoint}
                endPoint={selectedEndPoint}
                middlePoint={selectedMiddlePoint}/>
                </section>
             </section></>
            break;
        default: content = <><Header title={'Wybierz punkt początkowy'}/>
            <section className = 'search__conteiner'><StartList getStartPoint={saveStartPointHandler}
                stretches={response}/> </section></>
            break;
    }

    return (
        <> {content} </>
    )

}

export default SearchStretchController;
