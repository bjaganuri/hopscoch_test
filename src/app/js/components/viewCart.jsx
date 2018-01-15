import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Button  } from "react-bootstrap";

import ProductContainer from "./productContainer";

class ViewCart extends React.Component {
	constructor (props) {
		super(props);		
	}
	render () {
		var renderProdList = null;
		const cartObj = this.props.productList.cart;
		const selectedProdList = Object.keys(cartObj);
		if(selectedProdList.length > 0){
			renderProdList = selectedProdList.map((prodID) => 
				<ProductContainer key={cartObj[prodID].details.id} data={{details:{...cartObj[prodID].details}, cartQuantity:cartObj[prodID].quantity}} isCart={true}/>	
			);
		}
		else {
			renderProdList= (
				<div className="screenCenter">
					<h2>Your Cart is Empty</h2>
					<Button bsClass="btn btn-primary" onClick={() => this.props.dispatch(push("/home"))}>Continue Shopping</Button> 
				</div>
			)
		}

		return (
			<section className="productSection col-lg-12">
				{renderProdList}
			</section>
		)
	}
}

const mapStateToProps = state => ({
	productList: state.productList
});

export default connect(mapStateToProps,null)(ViewCart);