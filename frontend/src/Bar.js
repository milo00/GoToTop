import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Profile from "./pages/profile";
import Search from "./pages/search";
import Stretch from "./pages/stretches";
import LogOut from "./pages/logout";
import Remove from "./pages/stretches/remove";
import Add from "./pages/stretches/Add/add";
import Edit from "./pages/stretches/Edit/edit";
import EditSpecificStretch from "./pages/stretches/Edit/EditSpecificStretch";
import useAxios from "./utils/useAxios"

const URI_STRETCHES = "http://localhost:8080/scoredStretch";

const Bar = () => {

	const {response, error, loading} = useAxios({method: "get", url: URI_STRETCHES});
    const stretches = response;

    if (loading) {
        return (<h1>Loading...</h1>);
    } else if (error) {
        return (
            <error>
                <p>{error}</p>
            </error>
        );
    } else {
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
				<Route path="/stretches/edit/:id" element={<EditSpecificStretch stretches = {stretches} />} />
			</Routes>
		</Router>
	);
	}
};

export default Bar;
