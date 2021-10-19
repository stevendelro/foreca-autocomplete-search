import React, { useEffect } from 'react'

import { AppProps } from 'next/app'
import Cookies from 'universal-cookie'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import axios from 'axios'
import theme from '../theme'
import { wrapper } from '../store'

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props
  const cookies = new Cookies()
  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles && jssStyles.parentElement!.removeChild(jssStyles)
  }, [])

  // Initialize weather API access token, set cookie.
  useEffect(() => {
    const weatherAccessToken = cookies.get('weatherAccessToken')
    weatherAccessToken
      ? null
      : axios.get('/api/foreca/auth').then(({ data }) => {
          cookies.set('weatherAccessToken', data.accessToken, {
            path: '/',
            secure: true,
            maxAge: 3600,
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

// Return the app wrapped in withRedux
export default wrapper.withRedux(MyApp)
