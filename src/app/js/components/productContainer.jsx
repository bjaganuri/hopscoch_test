import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router";
import { Image  } from "react-bootstrap";
import { Control, Form, actions, Errors } from "react-redux-form";
import { Glyphicon  } from "react-bootstrap";

class ProductContainer extends React.Component {
	constructor (props) {
		super(props);
		this.updateCart = this.updateCart.bind(this);
	}
	updateCart (item, removeItemFromCart){
		if(!removeItemFromCart){
			this.props.dispatch({
				type: "additemtocart",
				payload: item
			})
		}
		else {
			this.props.dispatch({
				type: "removeItemFromCart",
				payload: item
			})
		}
	}
	render () {
		const prodDetails = this.props.data.details;
		const price = parseInt(prodDetails.retailPrice);
		const quantity = parseInt(prodDetails.quantity);
		let footerclass = "productContainerFooter productContainerFooter-100";
		let outOfStockText = null;
		let addRemoveItemButton = (
			<button className="btn" onClick={() => this.updateCart(prodDetails,false)}>Add to cart</button>
		);
		if(this.props.isCart) {
			addRemoveItemButton = (
				<h4 className="removeCartItemContainer">
					<Glyphicon glyph="minus-sign" onClick={() => this.updateCart(prodDetails,true)}/>
					<span className="quanityValIndicator">{this.props.data.cartQuantity}</span>
					{quantity === 0 ? <Glyphicon glyph="plus-sign text-muted"/> : <Glyphicon glyph="plus-sign" onClick={() => this.updateCart(prodDetails,false)}/>}
				</h4>
			);
		}
		else {
			addRemoveItemButton = (
				quantity === 0 ? null : <button className="btn" onClick={() => this.updateCart(prodDetails,false)}>Add to cart</button>
			);
		}
		if(price <= 100){
			footerclass = "productContainerFooter productContainerFooter-100";
		}
		else if(price> 100  && price <= 500){
			footerclass = "productContainerFooter productContainerFooter-250";
		}
		else if(price > 500){
			footerclass = "productContainerFooter productContainerFooter-500";
		}

		if(quantity === 0){
			outOfStockText = (
				<div className="screenCenter outOfStockIndicator">Out of stock</div>
			)	
		}

		return (
			<div className="productContainer col-lg-3">
				<div className="productImageContainer">
					<Image src={prodDetails.imgUrl} rounded/>
					{outOfStockText}
				</div>
				<h4 className="productName" title={prodDetails.name}>{prodDetails.name}</h4>
				<div className={footerclass}>
					<h2 className="productPriceIndicator">{price}&#8377;</h2>
					{addRemoveItemButton}
					<p className="text-right">
						<a href="javascript:void(0)" className="moreInfolink">More info >>></a>
					</p>
				</div>
			</div>	
		)
	}
}

export default connect(null,null)(ProductContainer);