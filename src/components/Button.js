import React from 'react';

export const Button = ({ onClick = () => {}, label = '', disabled = false, className = 'btn btn-default', type = 'button' }) => {
	return <input type={type} className={className} onClick={onClick} disabled={disabled} value={label} />;
};
