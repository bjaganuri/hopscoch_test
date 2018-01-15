import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";

export default class ResourceNotFound extends React.Component {
	render() {
		return (
			<h2 className="screenCenter">Requested resource not found. Click here to navigate <Link to={"/home"}>Home</Link> page</h2>
		);
	}

}
