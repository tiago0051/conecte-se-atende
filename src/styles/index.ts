import styled from "styled-components";

export const Main = styled.main`
    background-image: url("/imagens/index/fundo_formulario.webp");
    height: 100vh;
    width: 100vw;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    > div {
        position: absolute;
        top: 1rem;
        right: 1rem;

        button {
            padding: 10px 20px;
            font-size: 1rem;
            border: none;
            border-radius: 10px;
            cursor: pointer;
        }
    }

    form {
        background-color: white;
        padding: 2rem 2rem;
        margin: 0 4rem;
        border-radius: 10px;
        color: ${props => props.theme.colors.secondary};

        display: flex;
        flex-direction: column;
        justify-content: center;

        > h1 {
            font-size: 3rem;
        }

        > p {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        input {
            width: 100%;
            font-size: 1.5rem;
            padding: 5px 10px;
            border: 1px solid ${props => props.theme.colors.border};
            border-radius: 5px;
            transition: border 0.1s linear;

            :focus {
                border: 1px solid ${props => props.theme.colors.secondary};
            }
        }

        input[type="submit"] {
            background-color: ${props => props.theme.colors.secondary};
            border: 0;
            cursor: pointer;
            color: white;
            transition: filter 0.1s linear;

            :hover {
                filter: brightness(1.2);
            }
        }

        label {
            margin: 0.5rem 0;
        }
    }

    @media (max-width: 768px) {
        align-items: center;

        form {
            margin: 0;
        }
    }
`