import Form from './styles/Form'
import useForm from '../lib/useForm'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import DisplayError from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
	mutation REQUEST_RESET_MUTATION(
			$email: String!
		) {
			sendUserPasswordResetLink(
				email: $email
			) {
				code
				message
			}
		}
`

export default function RequestReset() {
	const {inputs, handleChange, resetForm} = useForm({
		email: ''
	})

const [resetUser, {data, loading, error }] = useMutation(
	REQUEST_RESET_MUTATION,
	{
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
	const res = await resetUser().catch(console.error)
	console.log(res)
	resetForm()
}

  return (
	<Form method="POST" onSubmit={handleSubmit}>
		<h2>Forgot Password</h2>
		<DisplayError error={error} />
		<fieldset>

		{data?.sendUserPasswordResetLink === null &&
			(<p>Success! Check your email for a link!</p>)}

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

			<button type='submit'>Forgot Password</button>
		</fieldset>

	</Form>
  )
}

