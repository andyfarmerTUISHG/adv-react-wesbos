import { useEffect, useState } from "react";

export default function useForm(initial = {}) {
	// Create a state object for our inputs
	const [inputs, setInputs] = useState(initial)
	// To avoid infinite Loop on useEffect convert the state to a unique string
	const initialValues = Object.values(initial).join('')
	useEffect(() => {
		// This functions runs when the thing we are watching change
		setInputs(initial)
	}, [initialValues])

	function handleChange(e){
		let {value, name, type} = e.target
		// console.log(value, name, type)

		if(type === 'number'){
			value = parseInt(value)
		}
		if (type === 'file'){
			[value] = e.target.files
		}
		setInputs({
			// copy the existing state
			...inputs,
			[name] : value
		})
	}

	function resetForm() {
		setInputs(initial)
	}
	function clearForm(){
		// Convert Object to array with Object.entries
		// Use Map to loop over the arrays of the object
		// and set the value to an empty string
		// Finally - convert the arrays back
		// to an Object via Object.fromEntries
		const blankState = Object.fromEntries(
			Object.entries(inputs).map(
				([key, value] ) => [key, '']
			)
		)

		setInputs(blankState)
	}
	//return the things we want to surface from the custom hook
	return{
		inputs,
		handleChange,
		resetForm,
		clearForm
	}
}
