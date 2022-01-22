import React from "react";
import { NavBtn, NavBtnLink } from "../components/NavBar/NavBarElements";

const Home = () => {
	return (
		<>
			<div
				className="conteiner"
				style={{
					height: "60vh",
				}}
			>
				<img src={require("../images/logo.png")} alt="logo" width={"50%"} />
			</div>
			<section
				style={{
					display: "flex",
				}}
			>
				<NavBtn>
					<NavBtnLink to="/search">WYSZUKAJ TRASĘ</NavBtnLink>
				</NavBtn>
				<NavBtn>
					<NavBtnLink to="/profile">ZALOGUJ</NavBtnLink>
				</NavBtn>
			</section>
		</>
	);
};

export default Home;
