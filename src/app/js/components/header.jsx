import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router";
import { push } from "react-router-redux";
import { FormGroup, InputGroup, Button, FormControl, Glyphicon  } from "react-bootstrap";
import { Control, Form, actions, Errors } from "react-redux-form";

class Header extends React.Component {
	constructor (props) {
		super(props);		
		this.getProdList = this.getProdList.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.state = {
			productSearchTimer: ""
		}
	}
	getProdList (data) {
		this.props.dispatch(push('/home/?category='+data.category+'&text='+data.text));
	}
	handleSearch (event) {
		clearTimeout(this.state.productSearchTimer);
		const searchVal = event.target.value;		
		this.state.productSearchTimer = setTimeout(() => {	
			this.getProdList({category:this.props.prodSearch.category , text:searchVal})
		} , 500);
	}
	render () {
		const logoWidth = {
			width: "13%"
		};
		const inputBoxHeight = {
			height: "42px"
		};
		const fontSize = {
			fontSize: "32px",
			color: "Gray"
		}
		var totalQuantity = 0;
		var totalPrice = 0;
		for(let key in this.props.productList.cart){
			totalQuantity = totalQuantity + parseInt(this.props.productList.cart[key].quantity);
			totalPrice = totalPrice + (parseInt(this.props.productList.cart[key].details.retailPrice)*parseInt(this.props.productList.cart[key].quantity));
		}
		return (
			<div className="header col-lg-12">
				<div className="col-lg-2">
					<div className="logo" onClick={() => this.props.dispatch(push("/home"))}>						
						<p>Hopscotch</p>
						<p>Online store</p>
					</div>
				</div> 
				<div className="searchProductForm col-lg-8">
					<Form 
						model="prodSearchResStore" 
						hideNativeErrors 
						onSubmit={this.getProdList}
						className="margin-top-25"

					>
						<div className="input-group ">
							<Control.text
								model=".text"
								id=".text"
								placeholder="Search products"
								className="form-control"
								style= {inputBoxHeight}
								onKeyUp = {this.handleSearch}
							/>
							<div className="input-group-btn">
								<button className="btn btn-default" type="submit" style={inputBoxHeight}>
									<Glyphicon glyph="search" />
								</button>
							</div>
						</div>
					</Form>
				</div>
				<div className="headerIcons col-lg-1 margin-top-25">
					<p><Glyphicon glyph="user" /></p>
					<a href="javascript:void(0)" className="headerNormalFont">My Account</a>
				</div>
				<div className="headerIcons col-lg-1 margin-top-25">
					<p onClick={() => this.props.dispatch(push("/viewcart"))}>
						<Glyphicon glyph="shopping-cart" className="cartIcon"></Glyphicon>
						<span className="cartQuantityIndicator">{totalQuantity}</span>
					</p>
					<a href="javascript:void(0)" className="headerNormalFont">{totalPrice}&#8377;</a>
				</div>
			</div>	
		)
	}
}

const mapStateToProps = state => ({
	prodSearch: state.prodSearchResStore,
	productList: state.productList,
});

export default connect(mapStateToProps,null)(Header);