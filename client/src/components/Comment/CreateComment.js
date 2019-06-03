import React, { useContext, useState } from "react";

import { CREATE_COMMENT } from "../../actionTypes";
import { CREATE_COMMENT_MUTATION } from "../../graphql/mutations";
import ClearIcon from "@material-ui/icons/Clear";
import Context from "../../context";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SendIcon from "@material-ui/icons/Send";
import { useClient } from "../../client";
import { withStyles } from "@material-ui/core";

const CreateComment = ({ classes }) => {
	const client = useClient();
	const { state } = useContext(Context);
	const [comment, setComment] = useState("");

	const handleSubmitComment = async () => {
		await client.request(CREATE_COMMENT_MUTATION, {
			pinId: state.currentPin._id,
			text: comment
		});
		setComment("");
	};

	return (
		<>
			<form className={classes.form}>
				<IconButton
					onClick={() => setComment("")}
					disabled={!comment.trim()}
					className={classes.clearButton}
				>
					<ClearIcon />
				</IconButton>
				<InputBase
					className={classes.input}
					placeholder="Add Comment"
					multiline={true}
					onChange={e => setComment(e.target.value)}
					value={comment}
				/>
				<IconButton
					disabled={!comment.trim()}
					className={classes.sendButton}
					onClick={handleSubmitComment}
				>
					<SendIcon />
				</IconButton>
			</form>
			<Divider />
		</>
	);
};

const styles = theme => ({
	form: {
		display: "flex",
		alignItems: "center"
	},
	input: {
		marginLeft: 8,
		flex: 1
	},
	clearButton: {
		padding: 0,
		color: "red"
	},
	sendButton: {
		padding: 0,
		color: theme.palette.secondary.dark
	}
});

export default withStyles(styles)(CreateComment);
