import React, { useState } from "react";
import useAxios from "../../utils/useAxios";
import AddForm from "./AddForm";

const URI_STRETCHES = "http://localhost:8080/scoredStretch";

const Add = () => {
	const { response, error, loading } = useAxios({
		method: "get",
		url: URI_STRETCHES,
	});
	const stretches = response;

	if (loading) {
		return <h1>Loading...</h1>;
	} else if (error) {
		return (
			<error>
				<p>{error}</p>
			</error>
		);
	} else {
		const stretchStartRoutePoints = stretches
			.map((stretch) => stretch.startPoint)
			.filter(
				(ele, ind) =>
					ind ===
					stretches.findIndex(
						(elem) =>
							elem.startPoint.id === ele.id && elem.startPoint.name === ele.name
					)
			);

		const startPoints = stretchStartRoutePoints.map((stretch) => {
			return { value: stretch.id, label: stretch.name };
		});

		return (
			<>
				<section className="title">
					<h1>DODAJ NOWY ODCINEK</h1>
					<h3>Podaj szczegóły:</h3>
					<AddForm stretches={stretches} startPoints={startPoints} />
				</section>
			</>
		);
	}
};

export default Add;
