import React, {useState} from "react";
import Select from "react-select";

function getRoutePoint(stretches, id) {
	const pointWithrepetitions = stretches
		.filter((stretch) => stretch.startPoint.id == id)
		.map((stretch) => stretch.startPoint);

	return pointWithrepetitions.find(
		(ele, ind) =>
			ind ===
			pointWithrepetitions.findIndex(
				(elem) => elem.id == ele.id && elem.name == ele.name
			)
	);
}


function SerachForEdit({stretches, startPoints, handleOnSelected}) {

    const [endPoints, setEndPoints] = useState([]);
    const [customPlaceholder, setCustomPlaceholder] = useState("Najpier wybierz punkt początkowy");
    const [errorMsg, setErrorMsg] = useState();
    const [value, setValue] = useState();


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

    function getRoutePoint(stretches, id) {
        const pointWithrepetitions = stretches
            .map((stretch) => stretch.startPoint)
            .find((stretch) => stretch.id == id);

            return pointWithrepetitions;
    
        /*return pointWithrepetitions.filter(
            (ele, ind) =>
                ind ===
                pointWithrepetitions.findIndex(
                    (elem) => elem.id == ele.id && elem.name == ele.name
                )
        );*/
    }

    


    const handleChangeStartPoint = (selectedOption) => {

        let end = stretches.filter((element) => element.startPoint.id == selectedOption.value).map((stretch) => stretch.endPoint).map((point) => {
            return {value: point.id, label: point.name};
        });


        end = end.filter((ele, ind) => ind === end.findIndex((elem) => elem.value === ele.value && elem.label === ele.label));

        setValue(null);
        setEndPoints(end);
        setCustomPlaceholder("Wybierz punkt końcowy");
    };


    const handleChangeEndPoint = (selectedOption) => {

        console.log(selectedOption)
        setValue(selectedOption)
    }

    /*const allFieldsFilled = values.every((field) => {
        const value = `${field}`.trim();
        return value !== '' && value !== '0';
    });*/

    const submitHandler = (e) => {

        e.preventDefault();
        
        let start = getRoutePoint(stretches, e.target.startPoint.value)
        let end = getRoutePoint(stretches, e.target.endPoint.value)
        
        console.log(start)

           
        const stretch = stretches.find((s) => s.startPoint.id === start.id && s.endPoint.id === end.id);

        console.log(stretch);
        if(stretch != null) {
            console.log(stretch);
            this.handleOnSelected(stretch);
        }      


    }

    return (
        <form onSubmit={submitHandler}>
        <div className="form">
            <div className="form-control">
                <label htmlFor="startPoint">Punkt początkowy:
                </label>
                <Select className="select"
                    theme={customTheme}
                    id = "startPoint"
                    name = "startPoint"
                    options={startPoints}
                    isSearchable
                    placeholder="Wybierz punkt początkowy"
                    onChange={handleChangeStartPoint}/>
            </div>
            <div className="form-control">
                <label htmlFor="endPoint">Punkt końcowy:
                </label>
                <Select className="select"
                    theme={customTheme}
                    id="endPoint"
                    name="endPoint"
                    options={endPoints}
                    isSearchable
                    placeholder={customPlaceholder}
                    value={value}
                    onChange={handleChangeEndPoint}/>
            </div>
            <div className="form-control">
                <label htmlFor="middlePoint">Punkt pośredni:
                </label>
                <input type="text" id="middlePoint" name="middlePoint"/>
            </div>
            <button type="submit">MODYFIKUJ
            </button>
        </div>
        </form>
    );
}

export default SerachForEdit;
