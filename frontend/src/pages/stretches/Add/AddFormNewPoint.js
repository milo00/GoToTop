import React from "react";
import Select from "react-select";
import useAxios from "../../../utils/useAxios";

const URI_AREAS = "http://localhost:8080/mountainArea";

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

const AddFormNewPoint = (id) => {
	id = id.id;

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

	return (
		<div>
			<div className="form-control">
				<label htmlFor={"name" + String(id)}>Nazwa: </label>
				<input
					required
					className="new-point"
					type="text"
					id={"name" + id}
					name={"name" + id}
				/>
			</div>
			<div className="form-control">
				<label htmlFor={"longitude" + id}>Długość geograficzna: </label>
				<input
					required
					className="new-point"
					type="number"
					step="0.000001"
					id={"longitude" + id}
					name={"longitude" + id}
				/>
			</div>
			<div className="form-control">
				<label htmlFor={"latitude" + id}>Szerokość geograficzna: </label>
				<input
					required
					className="new-point"
					type="number"
					step="0.000001"
					id={"latitude" + id}
					name={"latitude" + id}
				/>
			</div>
			<div className="form-control">
				<label htmlFor={"altitude" + id}>Wysokość: </label>
				<input
					required
					className="new-point"
					type="number"
					step="0.01"
					id={"altitude" + id}
					name={"altitude" + id}
				/>
			</div>
			<div className="form-control">
				<label htmlFor={"mountainArea" + id}>Teren górski: </label>
				<Select
					id={"mountainArea" + id}
					name={"mountainArea" + id}
					className="add-select"
					theme={customTheme}
					options={areas.map((area) => {
						return { value: area.id, label: area.name };
					})}
					isSearchable
					isClearable
					placeholder="Wybierz teren górski"
				/>
			</div>
		</div>
	);
};

export default AddFormNewPoint;
