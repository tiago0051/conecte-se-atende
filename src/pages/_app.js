import GlobalStyled from '../styles/global'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <GlobalStyled />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
