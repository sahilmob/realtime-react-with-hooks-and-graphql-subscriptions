import React, { useContext } from "react";

import AppBar from "@material-ui/core/AppBar";
import Context from "../context";
import MapIcon from "@material-ui/icons/Map";
import Signout from "./Auth/Signout";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import { withStyles } from "@material-ui/core/styles";

const Header = ({ classes }) => {
	const mobileSize = useMediaQuery("(max-width: 650px)");
	const { state } = useContext(Context);
	const { currentUser } = state;
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<div className={classes.grow}>
						<MapIcon className={classes.icon} />
						<Typography
							className={mobileSize ? classes.mobile : ""}
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
						>
							GeoPins
						</Typography>
					</div>
					{currentUser && (
						<div className={classes.grow}>
							<img
								className={classes.picture}
								src={currentUser.picture}
								alt={currentUser.name}
							/>
							<Typography
								className={mobileSize ? classes.mobile : ""}
								variant="h5"
								color="inherit"
								noWrap
							>
								{currentUser.name}
							</Typography>
						</div>
					)}
					<Signout />
				</Toolbar>
			</AppBar>
		</div>
	);
};

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1,
		display: "flex",
		alignItems: "center"
	},
	icon: {
		marginRight: theme.spacing.unit,
		color: "green",
		fontSize: 45
	},
	mobile: {
		display: "none"
	},
	picture: {
		height: "50px",
		borderRadius: "90%",
		marginRight: theme.spacing.unit * 2
	}
});

export default withStyles(styles)(Header);
