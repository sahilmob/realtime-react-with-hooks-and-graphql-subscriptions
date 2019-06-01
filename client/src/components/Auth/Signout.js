import React, { useContext } from "react";

import Context from "../../context";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { GoogleLogout } from "react-google-login";
import { SIGNOUT_USER } from "../../actionTypes";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const Signout = ({ classes }) => {
	const { dispatch } = useContext(Context);

	const onSignout = () => {
		dispatch({ type: SIGNOUT_USER });
		console.log("signedout");
	};
	return (
		<GoogleLogout
			onLogoutSuccess={onSignout}
			buttonText="Signout"
			render={({ onClick }) => (
				<span className={classes.root} onClick={onClick}>
					<Typography variant="body1" className={classes.buttonText}>
						Signout
					</Typography>
					<ExitToAppIcon className={classes.buttonIcon} />
				</span>
			)}
		/>
	);
};

const styles = {
	root: {
		cursor: "pointer",
		display: "flex"
	},
	buttonText: {
		color: "orange"
	},
	buttonIcon: {
		marginLeft: "5px",
		color: "orange"
	}
};

export default withStyles(styles)(Signout);
