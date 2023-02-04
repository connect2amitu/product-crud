// @ts-nocheck
import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button } from '../../components/Button';
import { TextBox } from '../../components/TextBox';

import { ProductContext } from '../../context/products/provider';

const schema = yup
	.object({
		title: yup.string().required('Title Required'),
		price: yup.number().typeError('Amount must be a number').required('Please provide price').min(1, 'Too low price'),
	})
	.required();

const EditProduct = ({ onClose, updateForm }) => {
	const { products, updateProduct } = useContext(ProductContext);
	const {
		control,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: {
			title: updateForm.selectedProduct.title,
			price: updateForm.selectedProduct.price,
		},
	});

	const onSubmit = (data) => {
		updateProduct(updateForm.selectedProduct.id, data);
	};

	const { isUpdating } = products;

	// Close Form
	const closeHandler = () => {
		!isUpdating && onClose();
	};

	return (
		<div className='modal'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='modal-body' id='update-product'>
					<div className='row heading'>
						<b>Update Product</b>
					</div>

					<div className='row'>
						<label>
							<b>Title: </b>
						</label>

						<Controller render={({ field }) => <TextBox {...field} placeholder='Title' />} name='title' control={control} />
						<p className='error'>{errors.title?.message}</p>
					</div>

					<div className='row'>
						<label>
							<b>Price: </b>
						</label>
						<Controller render={({ field }) => <TextBox {...field} type='number' placeholder='Price' />} name='price' control={control} />
						<p className='error'>{errors.price?.message}</p>
					</div>

					<div className='text-align-end'>
						<Button className='btn btn-default' label={'Cancel'} onClick={closeHandler} />
						<Button
							type='submit'
							disabled={!isDirty || !isValid}
							className={`btn btn-success ${!isDirty || !isValid ? 'disabled' : ''}`}
							label={isUpdating ? 'Updating..' : 'Update'}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EditProduct;
