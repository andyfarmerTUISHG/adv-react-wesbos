import { useMutation, useQuery } from "@apollo/client"
import gql from "graphql-tag"
import useForm from "../lib/useForm"
import DisplayError from "./ErrorMessage"
import Form from "./styles/Form"

const SINGLE_PRODUCT_QUERY = gql`
	query SINGLE_PRODUCT_QUERY($id: ID!) {
		Product(where: {
			id: $id
		}) {
			id
			name
			description
			price
		}
	}
`

const UPDATE_PRODUCT_MUTATION = gql`
	mutation UPDATE_PRODUCT_MUTATION(
		$id: ID!
		$name: String
		$description: String
		$price: Int
	) {
		updateProduct(
			id: $id
			data: {
				name: $name,
				description: $description,
				price: $price
			}
		) {
			id
			name
			description
			price
		}
	}
`
export default function UpdateProduct({id}) {
	// 1. We need to get the existing product
	const {data, error, loading} = useQuery(SINGLE_PRODUCT_QUERY, {
		variables: {id: id}
	})
	console.log(data)
	// 2. We need to get the mutation to update the product
	const [
		updateProduct,
		{ data: updateData, error: updateError, loading: updateLoading}
	] = useMutation(UPDATE_PRODUCT_MUTATION)
	// 2.5 Create Some State for the form inputs:
	const { inputs, handleChange, resetForm, clearForm } = useForm(	data?.Product );
	console.log(inputs);
	if (loading) return <p>loading...</p>;
	// 3. We need to handle the updates
  return (
	<Form onSubmit={async (e) => {
		e.preventDefault();
		//TODO: Handle Submit
		const res = await updateProduct({
			variables: {
				id: id,
				name: inputs.name,
				description: inputs.description,
				price: inputs.price,
			}
		}).catch(console.error)
		console.log(res)
		// Submit the input fields to the backend
		// As we know the inputs - the data is defined in the useMutation Hook
		// If not known in advance data can be sent as part of createProduct call
		// const res = await createProduct();
		// clearForm()
		// // Go to that products page
		// Router.push({
		// 	pathname: `/product/${res.data.createProduct.id}`
		// })

	}}>
		<DisplayError error={error || updateError} />
		<fieldset disabled={updateLoading} aria-busy={updateLoading}>

			<label htmlFor="name">
			Name
			<input
				type="text"
				id="name"
				name="name"
				placeholder="Name"
				value={inputs.name}
				onChange={handleChange}
			/>
			</label>
			<label htmlFor="price">
			Price
			<input
				type="number"
				id="price"
				name="price"
				placeholder="price"
				value={inputs.price}
				onChange={handleChange}
			/>
			</label>
			<label htmlFor="description">
			Description
			<textarea
				id="description"
				name="description"
				placeholder="Product Description"
				value={inputs.description}
				onChange={handleChange}
			/>
			</label>
			<button type="Submit">+ Update Product</button>
		</fieldset>
		{/* <button type="button" onClick={clearForm}>Clear Form</button>
		<button type="button" onClick={resetForm}>Reset Form</button> */}
	</Form>

  )
}
