import { AppProps } from 'next/dist/shared/lib/router/router'
import { ThemeProvider } from 'styled-components'

import { lightTheme } from '../styles/theme'

import GlobalStyled from '../styles/global'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={lightTheme}>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <GlobalStyled />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
