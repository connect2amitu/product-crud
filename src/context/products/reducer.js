import { actions } from './actions';

const productsReducer = (state, action) => {
	switch (action.type) {
		// FETCH
		case actions.FETCH_START: {
			return { ...state, isLoading: true };
		}

		case actions.FETCH_SUCCESS: {
			return {
				...state,
				data: action.payload.products,
				total: action.payload.totalProducts,
				isLoading: false,
			};
		}

		case actions.FETCH_ERROR: {
			return { ...state, error: action.payload.error, isLoading: false };
		}

		// UPDATE
		case actions.UPDATE_START: {
			return { ...state, isUpdating: true };
		}

		case actions.UPDATE_SUCCESS: {
			let prevProducts = [...state.data];
			let index = prevProducts.findIndex((product) => product.id === action.payload.productId);

			if (index >= 0) {
				prevProducts[index].title = action.payload.newDetails.title;
				prevProducts[index].price = action.payload.newDetails.price;
			}

			return { ...state, data: prevProducts, isUpdating: false };
		}

		case actions.UPDATE_ERROR: {
			return { ...state, error: action.payload.error, isUpdating: false };
		}

		// DELETE
		case actions.DELETE_START: {
			return { ...state, isDeleting: true };
		}

		case actions.DELETE_SUCCESS: {
			let prevproducts = [...state.data];
			let index = prevproducts.findIndex((product) => product.id === action.payload);

			index >= 0 && prevproducts.splice(index, 1);

			return { ...state, data: prevproducts, isDeleting: false };
		}

		case actions.DELETE_ERROR: {
			return { ...state, isDeleting: false, error: action.payload.error };
		}
		// PAGINATION
		case actions.SET_PAGE: {
			return { ...state, page: action.payload };
		}

		default:
			return state;
	}
};
export default productsReducer;
