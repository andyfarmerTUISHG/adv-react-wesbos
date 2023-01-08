import React, { Component } from 'react'
import Page from '../components/Page'
import Router from "next/router";
import NProgress from "nprogress";

// See https://nextjs.org/docs/api-reference/next/router
// See https://ricostacruz.com/nprogress/
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


import "../components/styles/nprogress.css";

export default function MyApp({Component, pageProps}) {
  return (
	<Page>
		<Component {...pageProps} />
	</Page>
  )
}


