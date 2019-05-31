const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
require("dotenv").config();

mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(_ => {
		console.log("DB connected");
	})
	.catch(err => console.error(err));

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.listen().then(({ url }) => console.log(`Server is listening on ${url}`));
