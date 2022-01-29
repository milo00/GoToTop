import React from "react";
import AddFormNewPointElement from "./AddFormNewPointElement";
import getDateFromString from "../../../utils/Util";
import useAxios from "../../../utils/useAxios";

const URI_AREAS = "http://localhost:8080/mountainArea";

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
	const { response, error, loading } = useAxios({
		method: "get",
		url: URI_AREAS,
	});
	const areas = response;

	if (loading) {
		return <h1>Loading...</h1>;
	} else if (error) {
		return (
			<div className="error">
				<h3>{error}</h3>
			</div>
		);
	}

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
				mountainAreas: areas.filter(
					(mountainArea) => mountainArea.id == e.target.mountainArea1.value
				),
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
				mountainAreas: areas.filter(
					(mountainArea) => mountainArea.id == e.target.mountainArea2.value
				),
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
							min={0.01}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="heightDifference">Suma przewyższeń: </label>
						<input
							type="number"
							required
							id="heightDifference"
							name="heightDifference"
							min={0}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="score">Punkty: </label>
						<input type="number" required id="score" name="score" min={1} />
					</div>
					<div className="form-control">
						<label htmlFor="walkingTime">Czas przejścia: </label>
						<input
							type="time"
							required
							id="walkingTime"
							name="walkingTime"
							defaultValue={"00:00"}
							min={"00:01"}
						/>
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
