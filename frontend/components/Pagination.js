import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import PaginationStyles from './styles/PaginationStyles'
import DisplayError from './ErrorMessage'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import {perPage} from '../config'

const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY{
		_allProductsMeta {
			count
		}
	}
`

export default function Pagination({page}) {
	const {error, loading, data} = useQuery(PAGINATION_QUERY)
	console.log(`Pagination Query`)
	console.log(error, loading, data)
	if(loading) return 'Loading';
	if(error) return <DisplayError error={error} />
	const {count} = data._allProductsMeta
	const pageCount = Math.ceil(count / perPage)
	console.log((count / perPage))
  return (
	<PaginationStyles>
		<Head>
			<title>Sick Fits - Page of {page} of {pageCount}</title>
		</Head>
		{/* Disable Link if the page does not exists */}
		<Link href={`/products/${page - 1}`}>
			<a aria-disabled={page <= 1}>
				←  Prev
			</a>
		</Link>
		<p>
			Page __of {pageCount}
		</p>
		<p>{count} Items Total</p>
		<Link href={`/products/${page + 1}`}>
			<a aria-disabled={page >= pageCount}>
				Next →
			</a>
		</Link>
	</PaginationStyles>
  )
}

 Pagination
