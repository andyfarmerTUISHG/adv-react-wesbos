import { useRouter } from 'next/dist/client/router';
import React from 'react';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

function productsPage() {
	const {query} =useRouter()
	const page = parseInt(query.page)
  return (
  	<div>
		<h3>Available Product List </h3>
		<Pagination page={ page || 1} />
			<Products page={ page || 1} />
		<Pagination page={ page || 1} />
	</div>
  );
}

export default productsPage;
