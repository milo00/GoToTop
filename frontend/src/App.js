import "./index.css";
import GoToTopService from "./api/gototop/GoToTopService.js";
import MountainAreaList from "./components/SearchStretch/MountainAreas/MountainAreaList.js";
import Bar from "./Bar";

function App() {
	const areas = GoToTopService.MountainAreasData();

	const saveCickedAreaHandler = (area) => {
		console.log(area);
	};

	return (
		<div>
			{/* <Bar></Bar> */}
			<MountainAreaList
				getCickedAreaHandler={saveCickedAreaHandler}
				areas={areas}
			/>
		</div>
	);
}

export default App;
