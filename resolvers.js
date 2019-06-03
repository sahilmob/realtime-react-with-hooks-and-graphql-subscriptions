const { AuthenticationError } = require("apollo-server");

const Pin = require("./models/Pin");

const authenticated = next => (root, args, ctx, info) => {
	if (!ctx.currentUser) {
		throw new AuthenticationError("You must be logged in");
	}
	return next(root, args, ctx, info);
};

module.exports = {
	Query: {
		me: authenticated((root, args, ctx, info) => ctx.currentUser),
		getPins: async (root, args, ctx) => {
			const pins = await Pin.find({})
				.populate("author")
				.populate("comments.author");
			return pins;
		}
	},
	Mutation: {
		createPin: async (root, args, ctx, info) => {
			const newPin = await new Pin({
				...args.input,
				author: ctx.currentUser._id
			}).save();
			const pinAdded = await Pin.populate(newPin, "author");
			return pinAdded;
		},
		createComment: authenticated(async (root, args, ctx, info) => {
			const newComment = { text: args.text, author: ctx.currentUser._id };
			const pinUpdated = await Pin.findByIdAndUpdate(
				{
					_id: args.pinId
				},
				{
					$push: { comments: newComment }
				},
				{ new: true }
			)
				.populate("author")
				.populate("comments.author");
			return pinUpdated;
		}),
		deletePin: authenticated(async (root, args, ctx, info) => {
			const pinDeleted = await Pin.findOneAndDelete({ _id: args.pinId }).exec();
			return pinDeleted;
		})
	}
};
