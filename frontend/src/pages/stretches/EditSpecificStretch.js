import React from "react";
import {useParams} from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import Header from "../../components/SearchStretch/Header";

function getDateFromHours(time) {
    time = time.split(':');
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
}

const EditSpecificStretch = ({stretches}) => {
    const {id} = useParams();

	const stretchToEdit = stretches.find(s => s.id == id);

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

		let values = [middlePoint, length, heightDifference, walkingTime, score];
		
		if (e.target.middlePoint.value) {
			middlePoint = e.target.middlePoint.value;
		} else {
			console.log("no middlePoint");
		}

		length = Number(e.target.length.value);
		heightDifference = Number(e.target.heightDifference.value);
		score = Number(e.target.score.value);
		walkingTime = e.target.walkingTime.value;

		walkingTime = moment(getDateFromHours(walkingTime)).format("hh:mm:ss");

		const stretch = {
			stretchId: id,
			middlePoint: middlePoint,			
			score: score,
			length: length,
			heightDifference: heightDifference,
			walkingTime: walkingTime
		};

		console.log(stretch);


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

export default EditSpecificStretch;
