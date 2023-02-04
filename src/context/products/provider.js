import React, { useReducer, createContext } from 'react';

import { actions } from './actions';
import productsReducer from './reducer';

import { editProduct, fetchProducts, removeProduct } from '../../services/products';

const intialState = {
	data: [],
	total: 0,
	page: 0,
	limit: 10,
	isLoading: true,
	isDeleting: false,
	isUpdating: false,
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

	const updateProduct = async (productId, newDetails) => {
		dispatch({ type: actions.UPDATE_START });
		try {
			const result = await editProduct(productId, newDetails);
			if (result) {
				dispatch({
					type: actions.UPDATE_SUCCESS,
					payload: { productId, newDetails },
				});

				dispatch({ type: actions.STOP_UPDATING });
			} else {
				dispatch({ type: actions.UPDATE_ERROR, payload: { error: 'Something went wrong' } });
			}
		} catch (error) {
			dispatch({ type: actions.UPDATE_ERROR, payload: { error: 'Something went wrong' } });
		}
	};

	const deleteProduct = async (productId) => {
		dispatch({ type: actions.DELETE_START });
		try {
			const deleted = await removeProduct(productId);
			if (deleted) {
				dispatch({ type: actions.DELETE_SUCCESS, payload: productId });
			} else {
				dispatch({ type: actions.DELETE_ERROR, payload: { error: 'Something went wrong' } });
			}
		} catch (error) {
			dispatch({ type: actions.DELETE_ERROR, payload: { error: 'Something went wrong' } });
		}
	};

	const setPage = (page) => {
		dispatch({ type: actions.SET_PAGE, payload: page });
	};

	return (
		<ProductContext.Provider value={{ products: state, getProducts, deleteProduct, updateProduct, setPage }}>{children}</ProductContext.Provider>
	);
};

export default ProductProvider;
