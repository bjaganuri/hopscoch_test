import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

class ProductFilterAndSort extends React.Component {
	constructor (props) {
		super(props);
		this.viewAllBrands = this.viewAllBrands.bind(this);
		this.filterAndSortProductList = this.filterAndSortProductList.bind(this);
	}
	viewAllBrands () {
		this.props.dispatch({
			type:"VIEW_ALL_BRANDS",
			payload: true
		});
	}
	filterAndSortProductList (event,filterObj) {
		if(event.target.checked){
			this.props.dispatch({
				type: "filterAndSortProductList",
				payload: {
					data:filterObj,
					action: "ADD"
				}	
			});
		}
		else {
			this.props.dispatch({
				type: "filterAndSortProductList",
				payload: {
					data:filterObj,
					action: "REMOVE"
				}	
			});	
		}
	}
	render () {
		const priceFilterArr =  [...this.props.productList.priceFilter.slice(0)];
		const brandFilterArr = this.props.productList.filter.viewAllBrands ? [...this.props.productList.brandFilter.slice(0)] : [...this.props.productList.brandFilter.slice(0,10) ,"MOREBRANDS"];
		const brandFilterList = brandFilterArr.map((brandName) => {			
			if(brandName === "MOREBRANDS"){
				return (
					<p  key={brandName}>
						<a href="javascript:void(0)" onClick={this.viewAllBrands}>More Brands</a>
					</p>
				)
			}
			else{
				return (
					<p  key={brandName}>
						<label>
							<input type="checkbox" className="filterCheckbox" checked={this.props.productList.filter.brand.indexOf(brandName) !== -1 ? true : false} onChange={(event) => this.filterAndSortProductList(event , {type:"filterBrand" , value:brandName})}/>
							{brandName}
						</label>
					</p>
				)
			}
		});
		const priceFilterList = priceFilterArr.map((price,idx) => {
			return (
				<p key={price}>
					<label>
						<input type="checkbox" className="filterCheckbox" checked={this.props.productList.filter.price.indexOf(price) !== -1 ? true : false} onChange={(event) => this.filterAndSortProductList(event , {type:"price" , value: price})}/>
						{price}
					</label>
				</p>
			)
		});
		const sortByFilterList = ["LH" , "HL"].map((type) => {
			return (
				<p key={type}>
					<label>
						<input type="radio" checked={(this.props.productList.filter.sort !== "" && type === this.props.productList.filter.sort) ? true : false} className="filterCheckbox" name="sortByPrice" onChange={(event) => this.filterAndSortProductList(event , {type:"sortByPrice" , value:type})}/>
						{type === "LH" ? "Low to High" : "High to Low" }
					</label>
				</p>	
			)
		});
		return(
			<div className="col-lg-2 productFilterSection">
				<h3>Refine By</h3>
				<h4>Brand</h4>
				{brandFilterList}
				<h4>Price</h4>
				{priceFilterList}
				<h3>Sort By</h3>
				{sortByFilterList}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	productList: state.productList,
});

export default connect(mapStateToProps,null)(ProductFilterAndSort);