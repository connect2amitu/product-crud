import React from 'react';

export const Loader = ({ className = 'loading', text = 'Loading...' }) => {
	return (
		<div className={className}>
			<span>{text}</span>
		</div>
	);
};
