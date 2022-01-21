import React from "react";
import AddFormNewPointElement from "./AddFormNewPointElement";

const handleSubmit = (e) => {
	e.preventDefault();
	console.log(e.target.monutainAreas.value);
};

const AddForm = ({ stretches, startPoints }) => {
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
