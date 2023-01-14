import React, { Component } from 'react'
import Page from '../components/Page'
import Router from "next/router";
import NProgress from "nprogress";
import "../components/styles/nprogress.css";
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData'

// See https://nextjs.org/docs/api-reference/next/router
// See https://ricostacruz.com/nprogress/
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())



function MyApp({Component, pageProps, apollo}) {
	console.log(apollo)
	return (
		<ApolloProvider client={apollo}>
		{/* A provider is a high level component that lives high in the app
		   this allows the children components to gain access to the data */}
		<Page>
			<Component {...pageProps} />
		</Page>
	</ApolloProvider>
  )
}

// Boiler Platee Tell Next js to go and get data via
MyApp.getInitialProps = async  function({Component, ctx}) {
	let pageProps = {}
	if (Component.getInitialProps){
		pageProps = await Component.getInitialProps(ctx)
	}
	// Get Any page URL paramas
	pageProps.query = ctx.query
	return {pageProps}
}

// By wrapping the export of MyApp with the withData function this ensures the apollo prop is based into the app
export default withData(MyApp)
