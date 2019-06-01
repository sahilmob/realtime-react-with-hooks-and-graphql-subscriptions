import Header from "../components/Header";
import React from "react";
import withRoot from "../withRoot";
import Map from "../components/Map"

const App = () => {
	return (
		<>
			<Header />
			<Map />
		</>
	);
};

export default withRoot(App);
