import React, { useContext } from "react";

import Context from "../../context";
import { GoogleLogin } from "react-google-login";
import { GraphQLClient } from "graphql-request";
import { LOGIN_USER } from "../../actionTypes";
import { withStyles } from "@material-ui/core/styles";

// import Typography from "@material-ui/core/Typography";

const ME_QUERY = `
query{
  me{
    _id
    name
    email
    picture
  }
}
`;

const Login = ({ classes }) => {
	const { dispatch } = useContext(Context);
	const onSuccess = async googleUser => {
		const idToken = googleUser.getAuthResponse().id_token;
		const client = new GraphQLClient("http://localhost:4000/graphql", {
			headers: { authorization: idToken }
		});
		const data = await client.request(ME_QUERY);
		dispatch({ type: LOGIN_USER, payload: data.me });
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
