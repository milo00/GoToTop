import React, { useEffect, useState } from "react";
import Select, { InputActionMeta } from "react-select";
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

let previousNew2State = null;

const AddFormNewPointElement = ({ stretches, startPoints }) => {
	const [endPoints, setEndPoints] = useState([]);
	const [customPlaceholder, setCustomPlaceholder] = useState(
		"Najpier wybierz punkt początkowy"
	);
	const [value, setValue] = useState();
	const [new1, setNew1] = useState(false);
	const [new2, setNew2] = useState(false);

	useEffect(() => {
		if (new1 && !new2) {
			const stretchStartRoutePoints = stretches
				.map((stretch) => stretch.startPoint)
				.filter(
					(ele, ind) =>
						ind ===
						stretches.findIndex(
							(elem) =>
								elem.startPoint.id === ele.id &&
								elem.startPoint.name === ele.name
						)
				);

			const allPoints = stretchStartRoutePoints.map((stretch) => {
				return { value: stretch.id, label: stretch.name };
			});

			setEndPoints(allPoints);
			setCustomPlaceholder("Wybierz punkt końcowy");
		} else if (
			!new1 &&
			!new2 &&
			(!previousNew2State || previousNew2State == null)
		) {
			setEndPoints([]);
			setValue(null);
			setCustomPlaceholder("Najpier wybierz punkt początkowy");
		}
	}, [new1, new2]);

	const handleChange = (selectedOption, { action }) => {
		if (action == "select-option") {
			let end = stretches
				.filter((element) => element.startPoint.id == selectedOption.value)
				.map((stretch) => stretch.endPoint)
				.map((point) => {
					return { value: point.id, label: point.name };
				});

			end = end.filter(
				(ele, ind) =>
					ind ===
					end.findIndex(
						(elem) => elem.value === ele.value && elem.label === ele.label
					)
			);

			setEndPoints(end);
			setValue(null);
			setCustomPlaceholder("Wybierz punkt końcowy");
		}
		if (action == "clear") {
			setValue(null);
			setEndPoints([]);
			setCustomPlaceholder("Najpier wybierz punkt początkowy");
		}
	};

	const handleChange2 = (selectedOption) => {
		setValue(selectedOption);
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
					previousNew2State = null;
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
				onChange={handleChange}
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
					previousNew2State =
						previousNew2State == null ? false : !previousNew2State;
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
				placeholder={customPlaceholder}
				value={value}
				onChange={handleChange2}
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
					previousNew2State = null;
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
					previousNew2State =
						previousNew2State == null ? false : !previousNew2State;
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
