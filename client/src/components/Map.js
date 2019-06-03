import { CREATE_DRAFT, GET_PINS, UPDATE_DRAFT_LOCATION } from "../actionTypes";
import React, { useContext, useEffect, useState } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";

import Blog from "./Blog";
import Context from "../context";
import { GET_PINS_QUERY } from "../graphql/queries";
import { MAPBOX_API_KEY } from "../constants";
import PinIcon from "./PinIcon";
import { useClient } from "../client";
import { withStyles } from "@material-ui/core/styles";

// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const INITIAL_VIEWPORT = {
	latitude: 37.7577,
	longitude: -122.4376,
	zoom: 13
};

const Map = ({ classes }) => {
	const client = useClient();
	const { state, dispatch } = useContext(Context);

	useEffect(() => {
		getPins();
	}, []);

	const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
	const [userPosition, setUserPosition] = useState(null);

	useEffect(() => {
		getUserPosition();
	}, []);

	const getUserPosition = () => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(position => {
				const { latitude, longitude } = position.coords;
				setViewport({ ...viewport, latitude, longitude });
				setUserPosition({ latitude, longitude });
			});
		}
	};

	const getPins = async () => {
		const { getPins } = await client.request(GET_PINS_QUERY);
		dispatch({ type: GET_PINS, payload: getPins });
	};

	const handleMapClick = ({ lngLat, leftButton }) => {
		if (!leftButton) return;
		if (!state.draft) {
			dispatch({ type: CREATE_DRAFT });
		}
		const [longitude, latitude] = lngLat;
		dispatch({ type: UPDATE_DRAFT_LOCATION, payload: { longitude, latitude } });
	};

	return (
		<div className={classes.root}>
			<ReactMapGL
				width="100vw"
				height="calc(100vh - 64px)"
				mapStyle="mapbox://styles/mapbox/streets-v9"
				mapboxApiAccessToken={MAPBOX_API_KEY}
				onViewportChange={newViewport => setViewport(newViewport)}
				onClick={handleMapClick}
				{...viewport}
			>
				<div className={classes.navigationControl}>
					<NavigationControl
						onViewportChange={newViewport => setViewport(newViewport)}
					/>
				</div>
				{userPosition && (
					<Marker
						latitude={userPosition.latitude}
						longitude={userPosition.longitude}
						offsetLeft={-19}
						offsetTop={-37}
					>
						<PinIcon size={40} color="red" />
					</Marker>
				)}

				{state.draft && (
					<Marker
						latitude={state.draft.latitude}
						longitude={state.draft.longitude}
						offsetLeft={-19}
						offsetTop={-37}
					>
						<PinIcon size={40} color="hotpink" />
					</Marker>
				)}
				{state.pins.map(pin => {
					return (
						<Marker
							key={pin._id}
							latitude={pin.latitude}
							longitude={pin.longitude}
							offsetLeft={-19}
							offsetTop={-37}
						>
							<PinIcon size={40} color="darkblue" />
						</Marker>
					);
				})}
			</ReactMapGL>
			<Blog />
		</div>
	);
};

const styles = {
	root: {
		display: "flex"
	},
	rootMobile: {
		display: "flex",
		flexDirection: "column-reverse"
	},
	navigationControl: {
		position: "absolute",
		top: 0,
		left: 0,
		margin: "1em"
	},
	deleteIcon: {
		color: "red"
	},
	popupImage: {
		padding: "0.4em",
		height: 200,
		width: 200,
		objectFit: "cover"
	},
	popupTab: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column"
	}
};

export default withStyles(styles)(Map);
