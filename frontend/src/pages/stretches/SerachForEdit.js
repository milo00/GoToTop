
import React, {useState} from "react";
import Select from "react-select";


function SerachForEdit({stretches, startPoints}) {

    const [endPoints, setEndPoints] = useState([]);
    const [customPlaceholder, setCustomPlaceholder] = useState("Najpier wybierz punkt początkowy");
    const [errorMsg, setErrorMsg] = useState();
    const [startPoint, setStartPoint] = useState();
    const [endPoint, setEndPoint] = useState();
    const [middlePoint, setMiddlePoint] = useState('-');

    const values = [startPoint, endPoint, middlePoint];


    function customTheme(theme) {
        return {
            ... theme,
            colors: {
                ... theme.colors,
                primary25: "#57b42f",
                primary: "#57b42f"
            }
        };
    }


    const handleChangeStartPoint = (selectedOption) => {
        let end = stretches.filter((element) => element.startPoint.id == selectedOption.value).map((stretch) => stretch.endPoint).map((point) => {
            return {value: point.id, label: point.name};
        });

        console.log(end);

        end = end.filter((ele, ind) => ind === end.findIndex((elem) => elem.value === ele.value && elem.label === ele.label));

        setEndPoints(end);
        setCustomPlaceholder("Wybierz punkt końcowy");
    };


    const handleChangeEndPoint = (selectedOption) => {
        
    };

    const allFieldsFilled = values.every((field) => {
        const value = `${field}`.trim();
        return value !== '' && value !== '0';
    });

    const submitHandler = (event) => {

        event.preventDefault();
        

        if (allFieldsFilled) {

            const stretchToEdit = stretches.find((s) => s.startPoint.id === startPoint.id && s.endPoint.id === endPoint.id);

            if (stretchToEdit != null) {
            }

        } else {
            setErrorMsg('You need to fill all fields!')
        }


    }

    return (
        <div className="form">
            <div className="form-control">
                <label htmlFor="startPoint">Punkt początkowy:
                </label>
                <Select className="select"
                    theme={customTheme}
                    options={startPoints}
                    isSearchable
                    value={startPoint}
                    placeholder="Wybierz punkt początkowy"
                    onChange={handleChangeStartPoint}/>
            </div>
            <div className="form-control">
                <label htmlFor="endPoint">Punkt końcowy:
                </label>
                <Select className="select"
                    theme={customTheme}
                    options={endPoints}
                    isSearchable
                    placeholder={customPlaceholder}
                    value={endPoint}
                    onChange={handleChangeEndPoint}/>
            </div>
            <div className="form-control">
                <label htmlFor="middlePoint">Punkt pośredni:
                </label>
                <input type="text" id="middlePoint" name="middlePoint" value={middlePoint}/>
            </div>
            <button onClick={
                () => submitHandler
            }>MODYFIKUJ
            </button>
        </div>
    );
}

export default SerachForEdit;
