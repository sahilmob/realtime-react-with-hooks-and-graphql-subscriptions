import { GoogleLogin } from "react-google-login";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {
	const onSuccess = googleUser => {
		const idToken = googleUser.getAuthResponse().id_token;
		console.log(idToken);
	};

	return (
		<GoogleLogin
			clientId="975756276358-ef53nqbi7p4pioe1r54vmqi5vplvj76m.apps.googleusercontent.com"
			onSuccess={onSuccess}
			isSignedIn={true}
		/>
	);
};

const styles = {
	root: {
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center"
	}
};

export default withStyles(styles)(Login);
