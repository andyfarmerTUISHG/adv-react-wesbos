import Form from './styles/Form'
import useForm from '../lib/useForm'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION(
		$email: String!,
		$name: String!,
		$password: String!
	) {
		createUser(data: {
			email: $email,
			name: $name,
			password: $password,
		}) {
			id
			email
			name
		}
	}
`

export default function SignUp() {
	const {inputs, handleChange, resetForm} = useForm({
		email: 'user1@farmer.gq',
		password: 'password1',
		name: 'User 1'

	})

const [signup, {data, loading, error }] = useMutation(SIGNUP_MUTATION, {
	variables: inputs,
	// // refetch the currently logged in user
	// refetchQueries: [{
	// 	query: CURRENT_USER_QUERY
	// }]
})

async function handleSubmit(e) {
	e.preventDefault();
	// console.log(inputs)
	// send email and password to the graphQLAPI
	const res = await signup().catch(console.error)
	console.log(res)
	resetForm()
}

  return (
	<Form method="POST" onSubmit={handleSubmit}>
		<h2>Sign Up For Your Account </h2>
		<DisplayError error={error} />
		<fieldset>

		{data?.createUser && (<p>Signed up with {data.createUser.email} - Please log in</p>)}
		<label htmlFor="name">
				Name
				<input
					type='name'
					name='name'
					placeholder='Full Name'
					autoComplete='name'
					value={inputs.name}
					onChange={handleChange}
					/>
			</label>
			<label htmlFor="email">
				Email
				<input
					type='email'
					name='email'
					placeholder='Your Email Address'
					autoComplete='email'
					value={inputs.email}
					onChange={handleChange}
					/>
			</label>
			<label htmlFor="password">
				Password
				<input
					type='password'
					name='password'
					placeholder='Password'
					autoComplete='password'
					value={inputs.password}
					onChange={handleChange}
					/>
			</label>
			<button type='submit'>Sign Up</button>
		</fieldset>

	</Form>
  )
}
