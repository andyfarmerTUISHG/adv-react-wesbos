import { useMutation } from "@apollo/client"
import gql from "graphql-tag"

const DELETE_PRODUCT_MUTATION = gql`
	mutation DELETE_PRODUCT_MUTATION($id: ID!) {
		deleteProduct(id: $id) {
			id
			name
		}
	}
`

// Function to evict item from the Apollo cache post delete
// vars cache is part of Apollo 3+ & payload is part of the Delete Mutation return
function update(cache, payload) {
	console.log(`Running the update function after delete mutation`)
	cache.evict(cache.identify(payload.data.deleteProduct))
}

export default function DeleteProduct({id, children}) {
	const [deleteProduct, {loading}] = useMutation(
		DELETE_PRODUCT_MUTATION,
		{
			variables: {
				id: id
			},
			update: update
		}
	)
	return (
		<button typeof="button"
			disabled={loading}
			onClick={() => {
			if ( confirm('Are you sure you want to delete this item?')) {
				// go ahead and delete
				console.log(`Delete Item`)
				deleteProduct().catch(err => alert(err.message))
			}
		}}>
			{children}
		</button>
  )
}
