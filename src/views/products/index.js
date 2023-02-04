import React, { useContext, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';

import { ProductContext } from '../../context/products/provider';

import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';

const Products = () => {
	const { products, setPage, getProducts, deleteProduct } = useContext(ProductContext);

	const { data, total, page, limit, isLoading, isDeleting } = products;

	useEffect(() => {
		getProducts({ page, limit });
	}, []);

	// Page change handler
	const pageChangeHandler = (page) => {
		setPage(page);
		getProducts({ page, limit });
	};

	// Delete Product handler
	const deleteProductHandler = (productId) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className='custom-confirm-ui'>
						<h1>Are you sure?</h1>
						<p>You want to delete this Product?</p>
						<div className='action'>
							<button className='btn btn-default' onClick={onClose}>
								No
							</button>
							<button
								className='btn btn-danger'
								onClick={() => {
									deleteProduct(productId);
									onClose();
								}}
							>
								Yes, Delete it!
							</button>
						</div>
					</div>
				);
			},
			closeOnEscape: isDeleting ? false : true,
			closeOnClickOutside: isDeleting ? false : true,
		});
	};

	// Discount Price count
	const discountedPrice = ({ price, discountPercentage }) => {
		let calclutedPrice = price - (price * discountPercentage) / 100;
		return calclutedPrice.toFixed(2);
	};

	return (
		<div id='products'>
			<table>
				<thead>
					<tr>
						<th>Image</th>
						<th>Name</th>
						<th>Price</th>
						<th colSpan={2}>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						{isLoading && (
							<td colSpan={4}>
								<Loader text='Loading...' />
							</td>
						)}
					</tr>
					{data.length > 0 &&
						data.map((product) => (
							<tr key={product.id}>
								<td>{<img src={product.thumbnail} alt={product.title} width={50} height={50} />}</td>
								<td>{product.title}</td>
								<td>{discountedPrice({ price: product.price, discountPercentage: product.discountPercentage })}</td>
								<td>
									<Button className='btn btn-primary' label={'Edit'} />
								</td>
								<td>
									<Button className='btn btn-danger' onClick={() => !isDeleting && deleteProductHandler(product.id)} label={'Delete'} />{' '}
								</td>
							</tr>
						))}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={3}></td>
						<td colSpan={2} align='right'>
							<div>
								<Button className='btn btn-warning' onClick={() => pageChangeHandler(page - 1)} disabled={page <= 0 ? true : false} label='&#8249;' />
								<Button className='btn btn-default' label={page + 1} />
								<Button
									className='btn btn-warning'
									onClick={() => pageChangeHandler(page + 1)}
									disabled={page >= total / limit - 1 ? true : false}
									label='&#8250;'
								/>
							</div>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default Products;
