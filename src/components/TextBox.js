import React from 'react';

export const TextBox = ({ onChange = () => {}, className = 'form-control', required = false, type = 'text', placeholder = '', ...rest }) => {
	return <input className={className} type={type} placeholder={placeholder} onChange={onChange} required={required} {...rest} />;
};
