import React from "react";
import AddFormNewPointElement from "./AddFormNewPointElement";
import getDateFromString from "../../../utils/Util";

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
	)[0];
}

const AddForm = ({ stretches, startPoints, onAddStretch, show }) => {
	//const [stretch, setStretch] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();

		let startPoint = null;
		let endPoint = null;
		let middlePoint = "";
		let length = null;
		let heightDifference = null;
		let score = null;
		let walkingTime = null;
		if (e.target.startPoint) {
			startPoint = getRoutePoint(stretches, e.target.startPoint.value);
		} else {
			startPoint = {
				name: e.target.name1.value,
				longitude: Number(e.target.longitude1.value),
				latitude: Number(e.target.latitude1.value),
				altitude: Number(e.target.altitude1.value),
			};
		}
		if (e.target.endPoint) {
			endPoint = getRoutePoint(stretches, e.target.endPoint.value);
		} else {
			endPoint = {
				name: e.target.name2.value,
				longitude: Number(e.target.longitude2.value),
				latitude: Number(e.target.latitude2.value),
				altitude: Number(e.target.altitude2.value),
			};
		}
		if (e.target.middlePoint.value) {
			middlePoint = e.target.middlePoint.value;
		} else {
			console.log("no middlePoint");
		}

		length = Number(e.target.length.value);
		heightDifference = Number(e.target.heightDifference.value);
		score = Number(e.target.score.value);
		walkingTime = e.target.walkingTime.value;

		walkingTime = getDateFromString(walkingTime).toTimeString().split(" ")[0];

		const stretch = {
			startPoint: startPoint,
			endPoint: endPoint,
			middlePoint: middlePoint,
			score: score,
			length: length,
			heightDifference: heightDifference,

			walkingTime: walkingTime,
		};

		console.log(JSON.stringify(stretch));
		onAddStretch(stretch);
	};

	if (show) {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form">
					<AddFormNewPointElement routePoints={startPoints} />

					<div className="form-control">
						<label htmlFor="middlePoint">Punkt pośredni: </label>
						<input type="text" id="middlePoint" name="middlePoint" />
					</div>
					<div className="form-control">
						<label htmlFor="length">Długość: </label>
						<input
							type="number"
							required
							step="0.01"
							id="length"
							name="length"
						/>
					</div>
					<div className="form-control">
						<label htmlFor="heightDifference">Suma przewyższeń: </label>
						<input
							type="number"
							required
							id="heightDifference"
							name="heightDifference"
						/>
					</div>
					<div className="form-control">
						<label htmlFor="score">Punkty: </label>
						<input type="number" required id="score" name="score" />
					</div>
					<div className="form-control">
						<label htmlFor="walkingTime">Czas przejścia: </label>
						<input type="time" required id="walkingTime" name="walkingTime" />
					</div>
					<button type="submit">DODAJ</button>
				</div>
			</form>
		);
	} else {
		return <></>;
	}
};

export default AddForm;
