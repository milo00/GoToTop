import React, { useEffect, useState } from "react";
import Select from "react-select";
import AddFormNewPoint from "./AddFormNewPoint";

function customTheme(theme) {
	return {
		...theme,
		colors: {
			...theme.colors,
			primary25: "#57b42f",
			primary: "#57b42f",
		},
	};
}

const AddFormNewPointElement = ({ routePoints }) => {
	const [endPoints, setEndPoints] = useState(routePoints);
	const [startPoints, setStartPoints] = useState(routePoints);
	const [new1, setNew1] = useState(false);
	const [new2, setNew2] = useState(false);

	const handleStartPointChange = (selectedOption, { action }) => {
		if (action == "select-option") {
			setEndPoints(
				routePoints.filter(
					(routePoint) => routePoint.value != selectedOption.value
				)
			);
		}
	};

	const handleEndPointChange = (selectedOption, { action }) => {
		if (action == "select-option") {
			setStartPoints(
				routePoints.filter(
					(routePoint) => routePoint.value != selectedOption.value
				)
			);
		}
	};

	const val1 = (
		<div className="new-checkox-included">
			<input
				type="checkbox"
				id="new1"
				name="new1"
				value="new1"
				onClick={() => {
					setNew1(!new1);
				}}
			/>
			<label id="new" htmlFor="new1">
				nowy
			</label>
			<label htmlFor="startPoint">Punkt początkowy: </label>
			<Select
				id="startPoint"
				name="startPoint"
				className="select"
				theme={customTheme}
				options={startPoints}
				isSearchable
				isClearable
				placeholder="Wybierz punkt początkowy"
				onChange={handleStartPointChange}
			/>
		</div>
	);

	const val2 = (
		<div className="new-checkox-included">
			<input
				type="checkbox"
				id="new2"
				name="new2"
				value="new2"
				onClick={() => {
					setNew2(!new2);
				}}
			/>
			<label id="new" htmlFor="new2">
				nowy
			</label>
			<label htmlFor="endPoint">Punkt końcowy: </label>
			<Select
				id="endPoint"
				name="endPoint"
				className="select"
				theme={customTheme}
				options={endPoints}
				isSearchable
				isClearable
				placeholder="Wybierz punkt końcowy"
				onChange={handleEndPointChange}
			/>
		</div>
	);

	const val3 = (
		<div className="new-checkox-excluded">
			<input
				type="checkbox"
				id="new1"
				name="new1"
				value="new1"
				onClick={() => {
					setNew1(!new1);
				}}
			/>
			<label id="new" htmlFor="new1">
				nowy
			</label>
			<label htmlFor="startPoint">Punkt początkowy: </label>
			<AddFormNewPoint id="1" />
		</div>
	);

	const val4 = (
		<div className="new-checkox-excluded">
			<input
				type="checkbox"
				id="new2"
				name="new2"
				value="new2"
				onClick={() => {
					setNew2(!new2);
				}}
			/>
			<label id="new" htmlFor="new2">
				nowy
			</label>
			<label htmlFor="endPoint">Punkt końcowy: </label>
			<AddFormNewPoint id="2" />
		</div>
	);

	if (new1 && new2) {
		return (
			<>
				{val3}
				{val4}
			</>
		);
	} else if (new1) {
		return (
			<>
				{val3}
				{val2}
			</>
		);
	} else if (new2) {
		return (
			<>
				{val1}
				{val4}
			</>
		);
	} else {
		return (
			<>
				{val1}
				{val2}
			</>
		);
	}
};

export default AddFormNewPointElement;
