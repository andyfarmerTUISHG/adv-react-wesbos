
import useForm from '../lib/useForm'
import Form from './styles/Form'

export default function CreateProduct() {

	const { inputs, handleChange, resetForm, clearForm } = useForm({
		image: '',
		name: 'Nice Shoes',
		price: 34234,
		description: 'These are the best shoes!',
	  });

  return (
	<Form onSubmit={(e) => {
		e.preventDefault();
		console.log(inputs)
	}}>
		<fieldset>
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
