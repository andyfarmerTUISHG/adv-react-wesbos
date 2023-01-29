import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import styled from "styled-components"
import Product from "./Product"

export const ALL_PRODUCTS_QUERY = gql`
	query ALL_PRODUCTS_QUERY{
	allProducts{
		id
		name
		description
		price
		photo{
		id
		altText
		image {
			publicUrlTransformed
		}
		}
	}
}`

//Create Grid for Products
const ProductListStyles = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;

`

function Products() {
	const {data, error, loading} = useQuery(ALL_PRODUCTS_QUERY)
	console.log(data, error, loading)
	if (loading) return <p> Loading...</p>
	if (error) return <p> Error: {error}</p>
	return (
		<div>

			<ProductListStyles>
				{data.allProducts.map((product) => (
					<Product key={product.id} product={product} />
					)
				)}
			</ProductListStyles>
		</div>
	)
}

export default Products
