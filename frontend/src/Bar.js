import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Profile from "./pages/profile";
import Search from "./pages/search";
import Stretch from "./pages/stretches";
import LogOut from "./pages/logout";
import Remove from "./pages/stretches/remove";
import Add from "./pages/stretches/add";
import Edit from "./pages/stretches/edit";

const Bar = () => {
	return (
		<Router>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/search" element={<Search />} />
				<Route path="/stretches" element={<Stretch />} />
				<Route path="/logout" element={<LogOut />} />
				<Route path="/stretches/remove" element={<Remove />} />
				<Route path="/stretches/add" element={<Add />} />
				<Route path="/stretches/edit" element={<Edit />} />
			</Routes>
		</Router>
	);
};

export default Bar;
