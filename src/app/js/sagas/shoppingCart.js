import React from 'react';
import {call, put} from 'redux-saga/effects';
import { actions } from "react-redux-form";
import {push, goBack, go} from 'react-router-redux';

import { CallRest } from "../api/callrest";

export function* FetchProdList(action){
	const data = {
		...action.payload
	}
	
	const response = yield call(CallRest , {
		url: "/items",
		method: "GET",
		dataType: "json",
		data: {

		}
	});

	if(response.callStatus === "error"){
		yield put ({
			type: "PROD_LIST_FETCH_REJECTED",
			payload: {}
		});
	}
	else {
		yield put ({
			type: "PROD_LIST_FETCH_SUCCESS",
			payload: response.data
		});
	}
}

export function* AddToCart(action){
	const data = {
		...action.payload
	}

	yield put({
		type: "UPDATE_PRODUCT_QUANTITY",
		payload: {
			id: data.id,
			reduceBy: 1
		}
	});

	yield put ({
		type: "ADD_TO_CART",
		payload: {
			["item_"+data.id]:{
				details:data
			},
			id: data.id
		}
	});
}

export function* RemoveFromCart(action){
	const data = {
		...action.payload
	}

	yield put({
		type: "UPDATE_PRODUCT_QUANTITY",
		payload: {
			id: data.id,
			reduceBy: -1
		}
	});

	yield put ({
		type: "REMOVE_FROM_CART",
		payload: data.id
	})
}

export function* FilterAndSortProductList (action){
	const data = {
		...action.payload
	}
	
	yield put ({
		type: "FILTER_SORT_PRODUCTS",
		payload: data
	})
}