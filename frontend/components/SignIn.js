import Form from './styles/Form'
import useForm from '../lib/useForm'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		authenticateUserWithPassword(email: $email, password: $password) {
			... on UserAuthenticationWithPasswordSuccess {
				item {
					id
					email
					name
				}
			}
			... on UserAuthenticationWithPasswordFailure {
				code
				message
			}
		}
	}
`

export default function SignIn() {
	const {inputs, handleChange, resetForm} = useForm({
		email: '',
		password: ''

	})

const [signin, {data, loading}] = useMutation(SIGNIN_MUTATION, {
	variables: inputs,
	// refetch the currently logged in user
	refetchQueries: [{
		query: CURRENT_USER_QUERY
	}]
})

async function handleSubmit(e) {
	e.preventDefault();
	// console.log(inputs)
	// send email and password to the graphQLAPI
	const res = await signin()
	resetForm()
}

const error =
data?.authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordFailure"
? data?.authenticateUserWithPassword : undefined


  return (
	<Form method="POST" onSubmit={handleSubmit}>
		<h2>Sign Into Your Account </h2>
		<DisplayError error={error} />
		<fieldset>
			<label htmlFor="email">
				Email
				<input
					type='email'
					name='email'
					placeholder='Your Email Address'
					autocomplete='email'
					value={inputs.email}
					onChange={handleChange}
					/>
			</label>
			<label htmlFor="password">
				Email
				<input
					type='password'
					name='password'
					placeholder='Password'
					autocomplete='password'
					value={inputs.password}
					onChange={handleChange}
					/>
			</label>
			<button type='submit'>Login In</button>
		</fieldset>

	</Form>
  )
}

