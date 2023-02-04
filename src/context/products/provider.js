import React, { useReducer, createContext } from 'react';

import { actions } from './actions';
import productsReducer from './reducer';

import { fetchProducts } from '../../services/products';

const intialState = {
	data: [],
	total: 0,
	page: 0,
	limit: 10,
	isLoading: true,
	error: null,
};

export const ProductContext = createContext(intialState);

const ProductProvider = ({ children }) => {
	const [state, dispatch] = useReducer(productsReducer, intialState);

	const getProducts = async ({ limit = 10, page = 0 }) => {
		dispatch({ type: actions.FETCH_START });
		const skip = page * limit;

		try {
			const payload = await fetchProducts({ limit, skip });

			dispatch({ type: actions.FETCH_SUCCESS, payload });
		} catch (error) {
			dispatch({ type: actions.FETCH_ERROR, payload: { error: 'Something went wrong' } });
		}
	};

	const setPage = (page) => {
		dispatch({ type: actions.SET_PAGE, payload: page });
	};

	return <ProductContext.Provider value={{ products: state, getProducts, setPage }}>{children}</ProductContext.Provider>;
};

export default ProductProvider;