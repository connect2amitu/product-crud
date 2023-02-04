import React from 'react';
import ProductProvider from './products/provider';

const AppProvider = ({ children }) => {
	return (
		<React.Fragment>
			<ProductProvider>{children}</ProductProvider>
		</React.Fragment>
	);
};

export default AppProvider;
