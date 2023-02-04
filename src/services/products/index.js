import { API_URL } from '../../shared/constants';

export const fetchProducts = async ({ limit, skip }) => {
	try {
		const result = await fetch(`${API_URL}?limit=${limit}&skip=${skip}&select=title,price,discountPercentage,thumbnail`);
		const { total, products } = await result.json();

		let payload = {
			totalProducts: total,
			products: products,
		};

		return payload;
	} catch (error) {
		throw error;
	}
};

export const removeProduct = async (productId) => {
	try {
		const result = await fetch(`${API_URL}/${productId}`, { method: 'DELETE' });
		const { isDeleted } = await result.json();

		return isDeleted;
	} catch (error) {
		throw error;
	}
};
