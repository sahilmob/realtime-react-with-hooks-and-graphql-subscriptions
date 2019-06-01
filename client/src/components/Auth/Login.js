import { IS_LOGGED_IN, LOGIN_USER } from "../../actionTypes";
import React, { useContext } from "react";

import Context from "../../context";
import { GoogleLogin } from "react-google-login";
import { GraphQLClient } from "graphql-request";
import { ME_QUERY } from "../../graphql/queries";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const Login = ({ classes }) => {
	const { dispatch } = useContext(Context);

	const onSuccess = async googleUser => {
		try {
			const idToken = googleUser.getAuthResponse().id_token;
			const client = new GraphQLClient("http://localhost:4000/graphql", {
				headers: { authorization: idToken }
			});
			const { me } = await client.request(ME_QUERY);
			console.log(me);
			dispatch({ type: LOGIN_USER, payload: me });
			dispatch({ type: IS_LOGGED_IN, payload: googleUser.isSignedIn() });
		} catch (err) {
			onFailure(err);
		}
	};

	const onFailure = err => {
		console.error("Error Logging in", err);
	};

	return (
		<div className={classes.root}>
			<Typography
				component="h1"
				variant="h3"
				gutterBottom
				noWrap
				style={{ color: "rgb(66,133,244)" }}
			>
				Welcome
			</Typography>
			<GoogleLogin
				clientId="975756276358-ef53nqbi7p4pioe1r54vmqi5vplvj76m.apps.googleusercontent.com"
				onSuccess={onSuccess}
				onFailure={onFailure}
				isSignedIn={true}
				theme="dark"
			/>
		</div>
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
