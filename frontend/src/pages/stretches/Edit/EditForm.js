import React, { useState } from "react";
import Select from "react-select";
import getDateFromString from "../../../utils/Util"
import moment from "moment";
import Header from "../../../components/UI/Header";



const EditForm = ({stretchToEdit, onEditHandle}) => {

	const [stretch, setStretch] = useState({
		startPoint: stretchToEdit ? stretchToEdit.startPoint : "",
		endPoint: stretchToEdit ? stretchToEdit.endPoint : "",
        middlePoint: stretchToEdit ? stretchToEdit.middlePoint : "",
        length: stretchToEdit ? stretchToEdit.length : "",
        heightDifference: stretchToEdit ? stretchToEdit.heightDifference : "",
        walkingTime: stretchToEdit ? stretchToEdit.walkingTime : "",
        score: stretchToEdit ? stretchToEdit.score : ""
    });

	let {startPoint, endPoint, middlePoint, length, heightDifference, walkingTime, score} = stretch;

	const handleSubmit = (e) => {
		e.preventDefault();
		
		if (e.target.middlePoint.value) {
			middlePoint = e.target.middlePoint.value;
		} else {
			console.log("no middlePoint");
		}

		length = Number(e.target.length.value);
		heightDifference = Number(e.target.heightDifference.value);
		score = Number(e.target.score.value);
		walkingTime = e.target.walkingTime.value;

		walkingTime = moment(getDateFromString(walkingTime)).format("hh:mm:ss");

		const stretch = {
			stretchId: stretchToEdit.id,
			middlePoint: middlePoint,			
			score: score,
			length: length,
			heightDifference: heightDifference,
			walkingTime: walkingTime
		};

		console.log(stretch);

		onEditHandle(stretch);

        //navigate("/stretches/edit/" , {onEditHandler(stretch)});

        


	};
	


	return (
		<>
		<Header title={startPoint.name + ' - ' + endPoint.name}/>
        <form onSubmit={handleSubmit}>
            <div className="form">
				<div><p>Wprowdź dane, które chcesz zmodyfikować</p></div>
                <div className="form-control">
					
                    <label htmlFor="middlePoint">Punkt pośredni:
                    </label>
                    <input type="text" id="middlePoint" name="middlePoint" defaultValue={middlePoint}/>
                </div>
                <div className="form-control">
                    <label htmlFor="length">Długość:
                    </label>
                    <input type="number" required step="0.01" id="length" name="length" defaultValue={length}/>
                </div>
                <div className="form-control">
                    <label htmlFor="heightDifference">Suma przewyższeń:
                    </label>
                    <input type="number" required id="heightDifference" name="heightDifference" defaultValue={heightDifference}/>
                </div>
                <div className="form-control">
                    <label htmlFor="score">Punkty:
                    </label>
                    <input type="number" required id="score" name="score" defaultValue={score}/>
                </div>
                <div className="form-control">
                    <label htmlFor="walkingTime">Czas przejścia:
                    </label>
                    <input type="time" required id="walkingTime" name="walkingTime" defaultValue={walkingTime}/>
                </div>
				<div>
				<button className="cancel">ANULUJ</button>
                <button className="submit" type="submit">ZATWIERDŹ</button>
				</div>

            </div>
        </form>
		</>
    );
};

export default EditForm;
