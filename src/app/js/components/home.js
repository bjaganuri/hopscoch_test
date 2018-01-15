import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import {push, goBack, go} from 'react-router-redux';
import { ProgressBar } from "react-bootstrap";

import Header from "./header";
import Footer from "./footer";

class Home extends React.Component {
	constructor (props){
		super (props);

		var category = this.props.route.query.category;
		var text = this.props.route.query.text;
		if(category === "" || category === " " || category === undefined || category === "undefined" || category === null || category === "null"){
			category = "All Categories";
		}
		if(text === "" || text === " " || text === undefined || text === "undefined" || text === null || text === "null"){
			text = "All";
		}

		if(this.props.route.pathname === "/" && category && text){
			this.props.dispatch(push('/home/?category='+category+'&text='+text));
		}

		this.props.dispatch({
			type: "fetchProdList"
		});
	}
	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<Header />
				</div>
				<div className="row">
					{ this.props.children }
				</div>
				<div className="row">
					<Footer />
				</div>
			</div>
		 )
	}
}

const mapStateToProps = (state) => ({
	productList: state.productList,
	route: state.routing.locationBeforeTransitions,
});

export default connect(mapStateToProps, null)(Home);