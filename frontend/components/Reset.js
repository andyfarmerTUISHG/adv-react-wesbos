import Form from './styles/Form'
import useForm from '../lib/useForm'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
	mutation RESET_MUTATION(
			$email: String!
			$password: String!
			$token: String!
		) {
			redeemUserPasswordResetToken(
				email: $email
				token: $token
				password: $password
			) {
				code
				message
			}
		}
`

export default function Reset({ token }) {
	const {inputs, handleChange, resetForm} = useForm({
		email: 'user1@farmer.gq',
		password: 'password2',
		token,
	})

const [resetUser, {data, loading, error }] = useMutation(
	RESET_MUTATION,
	{
		variables: inputs
})

const sucessfulError = data?.redeemUserPasswordResetToken?.__typename === "RedeemUserPasswordResetTokenResult"
? data?.redeemUserPasswordResetToken : undefined

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
		<h2>Reset Your Password</h2>
		<DisplayError error={error || sucessfulError} />
		<fieldset>

		{data?.redeemUserPasswordResetToken === null &&
			(<p>Success! You can now log in!</p>)}

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
			<button type='submit'>Reset Password</button>
		</fieldset>

	</Form>
  )
}

