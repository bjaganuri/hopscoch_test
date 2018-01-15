import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { connect, Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { combineForms, createForms } from "react-redux-form";
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import { productListReducer, prodSearchResReducer } from "./reducers/reducers";
import { sagas } from "./sagas/index";

const sagaMiddleware = createSagaMiddleware();

let middleware = applyMiddleware(routerMiddleware(browserHistory), logger, thunk, promise(), sagaMiddleware);

if(process.env.NODE_ENV !== 'production') {
  middleware = compose(middleware, (window.devToolsExtension ? window.devToolsExtension() : compose));  
}

const store = createStore(
	combineReducers({
		...createForms({
			prodSearchResStore: prodSearchResReducer
		}),
		productList: productListReducer,
		routing: routerReducer
	}),
	{},
	middleware
);

sagaMiddleware.run(sagas);

export default store;