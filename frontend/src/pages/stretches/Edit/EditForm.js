import React, { useState } from "react";
import getDateFromString from "../../../utils/Util";
import { useNavigate } from "react-router-dom";

const EditForm = ({ stretchToEdit, onEditHandle, show }) => {
	const [stretch, setStretch] = useState({
		startPoint: stretchToEdit ? stretchToEdit.startPoint : "",
		endPoint: stretchToEdit ? stretchToEdit.endPoint : "",
		middlePoint: stretchToEdit ? stretchToEdit.middlePoint : "",
		length: stretchToEdit ? stretchToEdit.length : "",
		heightDifference: stretchToEdit ? stretchToEdit.heightDifference : "",
		walkingTime: stretchToEdit ? stretchToEdit.walkingTime : "",
		score: stretchToEdit ? stretchToEdit.score : "",
	});

	const navigate = useNavigate();

	let { middlePoint, length, heightDifference, walkingTime, score } = stretch;

	const handleSubmit = (e) => {
		e.preventDefault();

		middlePoint = e.target.middlePoint.value;

		length = Number(e.target.length.value);
		heightDifference = Number(e.target.heightDifference.value);
		score = Number(e.target.score.value);
		walkingTime = e.target.walkingTime.value;

		walkingTime = getDateFromString(walkingTime).toTimeString().split(" ")[0];

		const stretch = {
			stretchId: stretchToEdit.id,
			middlePoint: middlePoint,
			score: score,
			length: length,
			heightDifference: heightDifference,
			walkingTime: walkingTime,
		};

		console.log(stretch);

		onEditHandle(stretch);
	};

	if (show) {
		return (
			<form onSubmit={handleSubmit} className="form">
				<div className="form-control">
					<label htmlFor="middlePoint">Punkt pośredni:</label>
					<input
						type="text"
						id="middlePoint"
						name="middlePoint"
						defaultValue={middlePoint}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="length">Długość:</label>
					<input
						type="number"
						required
						step="0.01"
						id="length"
						name="length"
						defaultValue={length}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="heightDifference">Suma przewyższeń:</label>
					<input
						type="number"
						required
						id="heightDifference"
						name="heightDifference"
						defaultValue={heightDifference}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="score">Punkty:</label>
					<input
						type="number"
						required
						id="score"
						name="score"
						defaultValue={score}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="walkingTime">Czas przejścia:</label>
					<input
						type="time"
						required
						id="walkingTime"
						name="walkingTime"
						defaultValue={walkingTime}
					/>
				</div>
				<div>
					<button
						className="cancel"
						onClick={() => navigate("/stretches/edit/")}
					>
						ANULUJ
					</button>
					<button className="submit" type="submit">
						ZATWIERDŹ
					</button>
				</div>
			</form>
		);
	} else {
		return <></>;
	}
};

export default EditForm;
