const user = {
	_id: "1",
	name: "Sahil",
	email: "Sahil@test.com",
	picture: "http://cloudinary.com/erdhgre"
};
module.exports = {
	Query: {
		me: () => user
	}
};
