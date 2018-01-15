import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import "bootstrap/dist/css/bootstrap.css";
import "../../css/main.css";

import Home from "./home";
import ViewProducts from "./viewProducts";
import ViewCart from "./viewCart";

import ResourceNotFound from "../components/resourceNotFound";

import store from "../store";

const history = syncHistoryWithStore(browserHistory, store)

export default class App extends React.Component {
	render() {
		return (
			<Router history={history}>
				<Route path={"/"} component={Home}>
					<IndexRoute component={ViewProducts} />
					<Route path={"/home(/:category)(/:text)"} component={ViewProducts} />
					<Route path={"/viewcart"} component={ViewCart} />
				</Route>
				
				<Route path="*" component={ResourceNotFound} />
			</Router>
		);
	}
}