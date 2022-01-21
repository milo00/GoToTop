import "./index.css";
import GoToTopService from "./api/gototop/GoToTopService.js";
import Bar from "./Bar";
import { useState } from "react";
import MountainAreaList from "./components/MountainAreas/MountainAreaList.js";
import SearchStretchController from "./components/SearchStretch/SearchStretch.js";
import useAxios from "./utils/useAxios.js";

function App() {
	/*
	const areas = GoToTopService.MountainAreasData();


	const saveCickedAreaHandler = (area) => {
		console.log(area);
	};

	return (
		<div>
			
			<MountainAreaList
				getCickedAreaHandler={saveCickedAreaHandler}
				areas={areas}
			/>
		</div>
	);
    */

	const { response, error, loading } = useAxios({
		method: "get",
		url: "http://localhost:8080/mountainArea",
	});

	//const areas = GoToTopService.MountainAreasData();

	const saveCickedAreaHandler = (area) => {
		console.log(area);
	};

	let content;
	content = loading ? (
		<p>loading</p>
	) : (
		<MountainAreaList
			getCickedAreaHandler={saveCickedAreaHandler}
			areas={response}
		/>
	);

	return (
		<div>
			<Bar></Bar>
		</div>
	);
}

export default App;
