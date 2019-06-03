import React, { useContext } from "react";

import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Context from "../../context";
import FaceIcon from "@material-ui/icons/Face";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const PinContent = ({ classes }) => {
	const { state } = useContext(Context);
	const { title, content, author, createdAt, comments } = state.currentPin;
	return (
		<div className={classes.root}>
			<Typography component="h2" variant="h4" color="primary" gutterBottom>
				{title}
			</Typography>
			<Typography
				className={classes.text}
				component="h3"
				variant="h6"
				color="inherit"
				gutterBottom
			>
				<FaceIcon className={classes.icon} /> {author.name}
			</Typography>
			<Typography
				className={classes.text}
				variant="subtitle2"
				color="inherit"
				gutterBottom
			>
				<AccessTimeIcon />
				{new Date(createdAt).toLocaleString()}
			</Typography>
			<Typography variant="subtitle1" gutterBottom>
				{content}
			</Typography>
		</div>
	);
};

const styles = theme => ({
	root: {
		padding: "1em 0.5em",
		textAlign: "center",
		width: "100%"
	},
	icon: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit
	},
	text: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}
});

export default withStyles(styles)(PinContent);
