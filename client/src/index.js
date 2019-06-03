import "mapbox-gl/dist/mapbox-gl.css";

import * as serviceWorker from "./serviceWorker";

import React, { useContext, useReducer } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import App from "./pages/App";
import Context from "./context";
import { InMemoryCache } from "apollo-cache-inmemory";
import ProtectedRoute from "./ProtectedRoute";
import ReactDOM from "react-dom";
import Splash from "./pages/Splash";
import { WebSocketLink } from "apollo-link-ws";
import reducer from "./reducer";

const wsLink = new WebSocketLink({
	uri: "ws://localhost:4000/graphql",
	options: {
		reconnect: true
	}
});

const client = new ApolloClient({
	link: wsLink,
	cache: new InMemoryCache()
});

const Root = () => {
	const initialState = useContext(Context);
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<Router>
			<ApolloProvider client={client}>
				<Context.Provider value={{ state, dispatch }}>
					<Switch>
						<ProtectedRoute exact path="/" component={App} />
						<Route path="/login" component={Splash} />
					</Switch>
				</Context.Provider>
			</ApolloProvider>
		</Router>
	);
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
