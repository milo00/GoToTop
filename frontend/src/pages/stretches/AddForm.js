import React from "react";
import AddFormNewPointElement from "./AddFormNewPointElement";

function getRoutePoint(stretches, id) {
	const pointWithrepetitions = stretches
		.filter((stretch) => stretch.startPoint.id == id)
		.map((stretch) => stretch.startPoint);

	return pointWithrepetitions.filter(
		(ele, ind) =>
			ind ===
			pointWithrepetitions.findIndex(
				(elem) => elem.id == ele.id && elem.name == ele.name
			)
	);
}

const AddForm = ({ stretches, startPoints }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		if (e.target.startPoint) {
			console.log(getRoutePoint(stretches, e.target.startPoint.value));
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="form">
				<AddFormNewPointElement
					stretches={stretches}
					startPoints={startPoints}
				/>

				<div className="form-control">
					<label htmlFor="middlePoint">Punkt pośredni: </label>
					<input type="text" id="middlePoint" name="middlePoint" />
				</div>
				<div className="form-control">
					<label htmlFor="length">Długość: </label>
					<input type="number" step="0.01" id="length" name="length" />
				</div>
				<div className="form-control">
					<label htmlFor="heightDifference">Suma przewyższeń: </label>
					<input type="number" id="heightDifference" name="heightDifference" />
				</div>
				<div className="form-control">
					<label htmlFor="score">Punkty: </label>
					<input type="number" id="score" name="score" />
				</div>
				<div className="form-control">
					<label htmlFor="walkingTime">Czas przejścia: </label>
					<input type="time" id="walkingTime" name="walkingTime" />
				</div>
				<button type="submit">DODAJ</button>
			</div>
		</form>
	);
};

export default AddForm;
