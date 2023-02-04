import React from 'react';
import AppProvider from './context/AppProvider';
import Products from './views/products';

function App() {
	return (
		<AppProvider>
			<Products />
		</AppProvider>
	);
}

export default App;
