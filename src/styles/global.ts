import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    html {
        font-family: 'Montserrat', sans-serif;;
    }

    input {
        outline: 0;
    }
`

export default GlobalStyle