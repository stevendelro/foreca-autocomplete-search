import React, { useEffect } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props
  const cookies = new Cookies()

  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles && jssStyles.parentElement!.removeChild(jssStyles)
  }, [])

  // Initialize weather API access token
  useEffect(() => {
    const weatherAccessToken = cookies.get('weatherAccessToken')
    weatherAccessToken
      ? null
      : axios.get('/api/foreca/auth').then(({ data }) => {
          cookies.set('weatherAccessToken', data.accessToken, {
            path: '/',
            secure: true,
          })
        })
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}
