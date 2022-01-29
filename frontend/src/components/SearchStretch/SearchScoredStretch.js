import {useState} from "react";
import useAxios from "../../utils/useAxios.js";
import Header from "../UI/Header.js";
import StartList from "./StartPointList.js";
import EndList from "./EndPointList.js";
import ScoredStretch from "./ScoredStretch/ScoredStretch.js";
import MountainAreaList from "../MountainAreas/MountainAreaList.js";
import SwitchButton from "../Botton/SwitchButton.js";

const URI_STRETCHES = "http://localhost:8080/scoredStretch";

function SearchStretchController() {
    const {response, error, loading} = useAxios({method: "get", url: URI_STRETCHES});

    const [mode, setMode] = useState([1]);
    const [isMountainListSelected, setMountainListSelected] = useState(false);
    const [selectedStartPoint, setSelectedStartPoint] = useState([]);
    const [selectedEndPoint, setSelectedEndPoint] = useState([]);
    const [selectedMiddlePoint, setSelectedMiddlePoint] = useState([]);
    const [selectedMountainArea, setSelectedMountainArea] = useState(null);

    const buttonStateHandler = (buttonState) => {
        setMountainListSelected(buttonState);
    }

    const savePointPropsHandler = (point, middlePoint) => {
        setSelectedEndPoint(point);
        setSelectedMiddlePoint(middlePoint);
        setMode(4);
    };

    const saveStartPointHandler = (point) => {
        setSelectedStartPoint(point);
        setMode(3);
    };

    const saveMountainAreaHandler = (area) => {
        console.log(area);
        setSelectedMountainArea(area);
        setMode(2);
    }

    const backButtonHandler = () => {
        if (mode === 2) {
            setSelectedMountainArea(null);
        }
        if (mode === 3 && selectedMountainArea === null) {
            setMode(1);
        } else {
            setMode((prevMode) => prevMode - 1);
        }

    };

    if (loading) {
        return (
            <section className="loading">
                <p>Loading...</p>
            </section>
        );
    }

    if (error) {
        return (
            <error className="error">
                <p>{
                    error.message
                }</p>
            </error>
        );
    }

    let content;
    const button = (
        <button className="button__back"
            onClick={backButtonHandler}>
            Cofnij
        </button>
    );
    switch (mode) {
        case 2: content = (
                <> {button}
                    <section>
                        <Header title={"Wybierz punkt początkowy"}/>
                        <section className="search__conteiner">
                            <StartList getStartPoint={saveStartPointHandler}
                                stretches={response}
                                mountainArea={selectedMountainArea}/>
                        </section>
                    </section>
                </>
            )
            break;
        case 3: content = (
                <> {button}
                    <section>
                        <Header title={
                                selectedStartPoint.name
                            }
                            subtitle={"Wybierz punkt końcowy:"}/>
                        <section className="search__conteiner">
                            <EndList getPointProps={savePointPropsHandler}
                                stretches={response}
                                startPoint={selectedStartPoint}/>
                        </section>
                    </section>
                </>
            );

            break;
        case 4: content = (
                <> {button}
                    <section>
                        <Header title={
                            selectedStartPoint.name + " - " + selectedEndPoint.name
                        }/>
                        <section className="search__conteiner">
                            <ScoredStretch stretches={response}
                                startPoint={selectedStartPoint}
                                endPoint={selectedEndPoint}
                                middlePoint={selectedMiddlePoint}/>
                        </section>
                    </section>
                </>
            );
            break;

        default:
            let switchButton = <SwitchButton leftLabel={"WYBIERZ PUNKT POCZĄTKOWY"}
                rightLabel={"WYBIERZ TEREN GÓRSKI"}
                currentState={isMountainListSelected}
                currentStateHandler={buttonStateHandler}/>
            content = isMountainListSelected ? (
                <> {switchButton}
                    <section className="search__conteiner">
                        <MountainAreaList stretches={response}
                            getCickedAreaHandler={saveMountainAreaHandler}/>
                    </section>

                </>
            ) : (
                <> {switchButton}
                    <section className="search__conteiner">
                        <StartList getStartPoint={saveStartPointHandler}
                            stretches={response}
                            mountainArea={selectedMountainArea}/>
                    </section>
                </>
            );
            break;
    }

    return <> {content} </>;
}

export default SearchStretchController;
