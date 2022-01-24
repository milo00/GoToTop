import React from "react";

const AddFormNewPoint = (id) => {
	id = id.id;
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
		</div>
	);
};

export default AddFormNewPoint;
