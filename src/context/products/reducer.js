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

		// PAGINATION
		case actions.SET_PAGE: {
			return { ...state, page: action.payload };
		}

		default:
			return state;
	}
};
export default productsReducer;
