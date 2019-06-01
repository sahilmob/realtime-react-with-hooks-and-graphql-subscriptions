import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";
import React from "react";

export default ({ size, color, onClick }) => (
	<PlaceTwoTone onClick={onClick} style={{ fontSize: size, color }} />
);
