import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import ProductContainer from "./productContainer";
import ProductFilterAndSort from "./productFilterAndSort";

class ViewProducts extends React.Component {
	constructor (props) {
		super(props);		
	}
	render () {
		var filtCategory = this.props.route.category;
		var filtText = this.props.route.text;
		var filteredProdList = {
			catalog: []
		};

		if((filtCategory === "" || filtCategory === " " || filtCategory === undefined || filtCategory === "undefined" || filtCategory === null || filtCategory === "null")){
			filtCategory = "All Categories";
		}
		if((filtText === "" || filtText === " " || filtText ===undefined || filtText === "undefined" || filtText === null || filtText === "null")){
			filtText = "All";
		}
		
		if(filtCategory === "All Categories" && filtText === "All"){
			filteredProdList = this.props.productList.catalog;
		}
		else {
			filteredProdList = this.props.productList.catalog.filter((product) => 
				product.name.toLocaleLowerCase().search(filtText.toLocaleLowerCase()) !== -1
			);
		}
		var renderProdList = null;
		if(this.props.productList.fetchStatus === "INPROGRESS"){
			renderProdList= (
				<div className="loaderWrapper">
					<div className="screenCenter loadingMsg">Loading....</div>
					<div className="screenCenter loader"></div>
				</div>
			)
		}
		else if(this.props.productList.fetchStatus === "SUCCESS" && filteredProdList.length > 0){			
			renderProdList = filteredProdList.map((prodData) => 
				<ProductContainer key={prodData.id} data={{details:{...prodData}}} isCart={false}/>	
			);
		}
		else if(this.props.productList.fetchStatus === "SUCCESS" && filteredProdList.length === 0){
			renderProdList = (
				<div className="screenCenter">
					<h2>We couldn't find any matches!</h2>
				</div>
			);
		}
		else if(this.props.productList.fetchStatus === "FAILED") {
			renderProdList = (
				<div className="screenCenter">
					<h2>Failed to fetch products refersh the page and try again...</h2>
				</div>
			);
		}
		return (
			<div className="row productSection">
				<ProductFilterAndSort/>
				<section className="col-lg-10 productCatalog">
					{renderProdList}
				</section>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	productList: state.productList,
	route: state.routing.locationBeforeTransitions.query,
});

export default connect(mapStateToProps,null)(ViewProducts);
