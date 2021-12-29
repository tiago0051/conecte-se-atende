import { ThemeProvider } from 'styled-components'

import { lightTheme } from '../styles/theme'

import GlobalStyled from '../styles/global'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <GlobalStyled />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
