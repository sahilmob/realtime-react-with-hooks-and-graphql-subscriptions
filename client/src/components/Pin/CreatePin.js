import { CREATE_PIN, DISCARD_DRAFT } from "../../actionTypes";
import React, { useContext, useState } from "react";

import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import Button from "@material-ui/core/Button";
import { CLOUDINARY_CLOUD_NAME } from "../../constants";
import { CREATE_PIN_MUTATION } from "../../graphql/mutations";
import ClearIcon from "@material-ui/icons/Clear";
import Context from "../../context";
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
import SaveIcon from "@material-ui/icons/SaveTwoTone";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useClient } from "../../client";
import { withStyles } from "@material-ui/core/styles";

const CreatePin = ({ classes }) => {
	const { state, dispatch } = useContext(Context);
	const client = useClient();

	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [content, setContent] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handleImageUpload = async () => {
		const fd = new FormData();
		fd.append("file", image);
		fd.append("upload_preset", "geopins");
		fd.append("cloud_name", CLOUDINARY_CLOUD_NAME);
		const res = await axios.post(
			`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
			fd
		);

		return res.data.url;
	};

	const handleSubmit = async event => {
		try {
			event.preventDefault();
			setSubmitting(true);
			const url = await handleImageUpload();
			const { latitude, longitude } = state.draft;
			const { createPin } = await client.request(CREATE_PIN_MUTATION, {
				title,
				content,
				image: url,
				latitude,
				longitude
			});

			dispatch({ type: CREATE_PIN, payload: createPin });
			setSubmitting(false);
			handleDiscardDraft();
		} catch (err) {
			setSubmitting(false);
			console.error(`Error creating pin ${err}`);
		}
	};

	const handleDiscardDraft = () => {
		clearInputs();
		dispatch({ type: DISCARD_DRAFT });
	};

	const clearInputs = () => {
		setTitle("");
		setImage("");
		setContent("");
	};

	return (
		<form className={classes.form}>
			<Typography
				className={classes.alignCenter}
				component="h2"
				variant="h4"
				color="secondary"
			>
				<LandscapeIcon className={classes.iconLarge} /> Pin a Location
			</Typography>
			<div>
				<TextField
					name="title"
					label="title"
					placeholder="Inset pin title"
					onChange={e => setTitle(e.target.value)}
				/>
				<input
					accept="image/*"
					id="image"
					type="file"
					className={classes.input}
					onChange={e => setImage(e.target.files[0])}
				/>
				<label htmlFor="image">
					<Button
						component="span"
						size="small"
						className={classes.button}
						style={{ color: image && "green" }}
					>
						<AddAPhotoIcon />
					</Button>
				</label>
			</div>
			<div className={classes.contentField}>
				<TextField
					name="content"
					label="content"
					multiline
					rows="6"
					margin="normal"
					fullWidth
					variant="outlined"
					onChange={e => setContent(e.target.value)}
				/>
			</div>
			<div>
				<Button
					className={classes.button}
					variant="contained"
					color="primary"
					onClick={handleDiscardDraft}
				>
					<ClearIcon className={classes.leftIcon} />
					Discard
				</Button>
				<Button
					className={classes.button}
					type="submit"
					variant="contained"
					color="secondary"
					onClick={handleSubmit}
					disabled={!title.trim() || !image || !content.trim() || submitting}
				>
					Submit
					<SaveIcon className={classes.rightIcon} />
				</Button>
			</div>
		</form>
	);
};

const styles = theme => ({
	form: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		paddingBottom: theme.spacing.unit
	},
	contentField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: "95%"
	},
	input: {
		display: "none"
	},
	alignCenter: {
		display: "flex",
		alignItems: "center"
	},
	iconLarge: {
		fontSize: 40,
		marginRight: theme.spacing.unit
	},
	leftIcon: {
		fontSize: 20,
		marginRight: theme.spacing.unit
	},
	rightIcon: {
		fontSize: 20,
		marginLeft: theme.spacing.unit
	},
	button: {
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit,
		marginLeft: 0
	}
});

export default withStyles(styles)(CreatePin);
