const InitialProdList = {
	fullProdList: [],
	catalog: [],
	cart: {},
	brandFilter: [],
	priceFilter: [],
	fetchStatus: "INPROGRESS",
	filter: {
		brand: [],
		price: [],
		sort: "",
		viewAllBrands: false
	},
	updateProductQuantity: "FAILED"
};

const InitialProdSearchRes = {
	category: "All Categories",
	text: ""
}

export const productListReducer = (state = InitialProdList, action) => {
	switch (action.type){
		case "PROD_LIST_FETCH_SUCCESS":
			state = JSON.parse(JSON.stringify(state));
			state.fetchStatus= "SUCCESS";
			state.fullProdList= [...action.payload.records];
			state.catalog= [...action.payload.records];
			state.brandFilter = [...new Set(state.catalog.map((item) => {
				return item.brandName.toString().trim();
			}))];
			state.priceFilter = [...new Set([100 , 500 , 1000 , 5000 , 10000])];
			break;

		case "PROD_LIST_FETCH_REJECTED":
			state = JSON.parse(JSON.stringify(state)); 
			state.fetchStatus= "FAILED";
			break;

		case "UPDATE_PRODUCT_QUANTITY":
			state = JSON.parse(JSON.stringify(state));
			
			for(let i in state.catalog){
				if(state.catalog[i].id.toString() === action.payload.id.toString() && (parseInt(state.catalog[i].quantity) >= 1 || parseInt(action.payload.reduceBy) < 1)){
					state.catalog[i].quantity = parseInt(state.catalog[i].quantity) - (parseInt(action.payload.reduceBy));
					state.updateProductQuantity = "SUCCESS";
					break;
				}
				else {
					state.updateProductQuantity = "FAILED"; 
				}
			}
			break;
		
		case "ADD_TO_CART":
			if(state.cart.hasOwnProperty("item_"+action.payload.id)){
				state = JSON.parse(JSON.stringify(state));
				state.cart["item_"+action.payload.id].details= {
					...(state.catalog.filter((item) => {
						return (item.id === action.payload.id) ? true : false	
					})[0])
				};
				if(state.updateProductQuantity === "SUCCESS"){
					state.cart["item_"+action.payload.id].quantity= parseInt(state.cart["item_"+action.payload.id].quantity)+1;
				}
				else {
					state.cart["item_"+action.payload.id].quantity= parseInt(state.cart["item_"+action.payload.id].quantity);
				}
			}
			else{
				state = JSON.parse(JSON.stringify(state));

				state.cart["item_"+action.payload.id] = {
					details: {
						...(state.catalog.filter((item) => {
							return (item.id === action.payload.id) ? true : false	
						})[0])
					},
					quantity: 1
				}
				if(state.updateProductQuantity === "SUCCESS"){
					state.cart["item_"+action.payload.id].quantity= 1;
				}
				else {
					state.cart["item_"+action.payload.id].quantity= state.cart["item_"+action.payload.id].quantity || 0;
				}
			}
			break;

		case "REMOVE_FROM_CART":
			if(state.cart.hasOwnProperty("item_"+action.payload)){
				state = JSON.parse(JSON.stringify(state));
				if(parseInt(state.cart["item_"+action.payload].quantity) > 1) {
					state.cart["item_"+action.payload].quantity = state.cart["item_"+action.payload].quantity-1;

					state.cart["item_"+action.payload].details= {
						...(state.catalog.filter((item) => {
							return (item.id.toString() === action.payload.toString()) ? true : false	
						})[0])
					};
				}
				else {
					delete state.cart["item_"+action.payload];
				}
			}
			break;
		case "FILTER_SORT_PRODUCTS":
			state = JSON.parse(JSON.stringify(state));
			if(action.payload.data.type === "filterBrand" && action.payload.action === "ADD"){
				state.filter.brand.push(action.payload.data.value);
				state.filter.brand = [...new Set(state.filter.brand)];
			}
			else if(action.payload.data.type === "filterBrand" && action.payload.action === "REMOVE"){
				state.filter.brand.splice(state.filter.brand.indexOf(action.payload.data.value) , 1);
				state.filter.brand = [...new Set(state.filter.brand)];
			}
			if(action.payload.data.type === "price" && action.payload.action === "ADD"){
				state.filter.price.push(action.payload.data.value);
				state.filter.price = [...new Set(state.filter.price)];
			}
			else if(action.payload.data.type === "price" && action.payload.action === "REMOVE"){
				state.filter.price.splice(state.filter.price.indexOf(action.payload.data.value) , 1);
				state.filter.price = [...new Set(state.filter.price)];
			}
			if(action.payload.data.type === "sortByPrice"){
				state.filter.sort = action.payload.data.value;
			}
			state.catalog = state.fullProdList.filter((item) => {
				var validItem = true;
				if(state.filter.brand.length !== 0 && validItem){
					if(state.filter.brand.indexOf(item.brandName) !== -1){
						validItem = true;
					}
					else {
						validItem = false;
					}
				}
				if(state.filter.price.length !== 0 && validItem){
					var priceBand = [];
					for(let i in state.filter.price){
						priceBand = state.filter.price[i].replace(">","").split("-");
						if((parseInt(item.retailPrice) >= parseInt(priceBand[0]) && parseInt(priceBand[1]) && parseInt(item.retailPrice) <= parseInt(priceBand[1]))){
							validItem = true;
							break;
						}
						else if((parseInt(item.retailPrice) >= parseInt(priceBand[0])) && !parseInt(priceBand[1])){
							validItem = true;
							break;
						}
						else {
							validItem = false;
						}
					}
				}
				if(validItem) {
					return item;
				}
			});
			if(state.filter.sort !== ""){
				state.catalog.sort((a,b) => {
					return state.filter.sort === "HL" ? (parseInt(b.retailPrice) - parseInt(a.retailPrice)) : (parseInt(a.retailPrice) - parseInt(b.retailPrice));
				});
			}
		break;
		case "VIEW_ALL_BRANDS":
			state = JSON.parse(JSON.stringify(state));
			state.filter.viewAllBrands = action.payload;
		break;
	}
	return state;
};

export const prodSearchResReducer = (state = InitialProdSearchRes, action) => {
	switch (action.type){
		case "UPDATE_SEARCH_PARAMS":
			state = {
				...action.payload
			}
			break;
	}
	return state;
};