
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage';
import Form from './styles/Form'

const CREATE_PRODUCT_MUTATION =gql`
	mutation CREATE_PRODUCT_MUTATION(
		# Which vairables are getting posted in?
		# And what types are they
		$name: String!
		$description: String!
		$price: Int!
		$image: Upload
	) {
	createProduct(
		data: {
			name: $name
			description: $description
			price: $price
			status: "AVAILABLE"
			photo: {
				create: {
					image: $image,
					altText: $name
				}
			}
		}
	) {
		id
		name
		price
		description
	}
}
`


export default function CreateProduct() {

	const { inputs, handleChange, resetForm, clearForm } = useForm({
		image: '',
		name: 'Nice Shoes',
		price: 34234,
		description: 'These are the best shoes!',
	});

	const [createProduct, {loading, error, data}] = useMutation(
		CREATE_PRODUCT_MUTATION, {
			variables: inputs
		}
	)

  return (
	<Form onSubmit={async (e) => {
		e.preventDefault();
		console.log(inputs)
		// Submit the input fields to the backend
		// As we know the inputs - the data is defined in the useMutation Hook
		// If not known in advance data can be sent as part of createProduct call
		await createProduct();
		clearForm()
	}}>
		<DisplayError error={error} />
		<fieldset disabled={loading} aria-busy={loading}>
			<label htmlFor="image">
				Image
				<input
					type="file"
					id="image"
					name="image"
					required
					onChange={handleChange}
				/>
			</label>
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
			<button type="Submit">+ Add Product</button>
		</fieldset>
		{/* <button type="button" onClick={clearForm}>Clear Form</button>
		<button type="button" onClick={resetForm}>Reset Form</button> */}
	</Form>
  )
}
