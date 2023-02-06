import React from 'react'
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({query}) {
	const token = query?.token;
	if(!query?.token) {
		return (
			<div>
				<p>Sorry you must supply a token</p>
				<RequestReset />
			</div>
		)
	}
  return (
	<div>
		<h3>Reset your Password</h3>
		<Reset token={token} />
	</div>
  )
}
