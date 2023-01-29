import React from 'react';
import Pagination from '../components/Pagination';
import Products from '../components/Products';

function productsPage() {
  return (
  	<div>
		<h3>Available Product List</h3>
		<Pagination page={1} />
			<Products />
		<Pagination page={1} />
	</div>
  );
}

export default productsPage;
