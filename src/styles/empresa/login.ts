import styled from 'styled-components';

export const MainStyled = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: ${props =>props.theme.colors.secondary};

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: ${props =>props.theme.colors.background};
        padding: 1.8rem 2rem;
        border-radius: 0.5rem;

        h1 {
            border-bottom: 3px solid ${props =>props.theme.colors.secondary};
            color: ${props =>props.theme.colors.secondary};
            width: 100%;
            text-align: center;
            margin-bottom: 2rem;
            font-size: 3rem;
            font-weight: 700;
            margin-top: 1rem;
        }

        label {
            display: flex;
            flex-direction: column;
            margin-bottom: 1.5rem;
            width: 100%;
            color: ${props =>props.theme.colors.secondary};
            font-size: 1.3rem;
            text-transform: uppercase;

            input {
                margin-top: 0.5rem;
                font-size: 2rem;
                padding: 5px 10px;
                border-radius: 0.5rem;
                border: 1px solid ${props =>props.theme.colors.secondary};
                background-color: ${props =>props.theme.colors.background};
                transition: border 0.2s linear;

                :focus{
                    border: 1px solid ${props =>props.theme.colors.primary};
                }
            }
        }

        button {
            width: 100%;
            padding: 5px 10px;
            border-radius: 0.5rem;
            background-color: ${props =>props.theme.colors.secondary};
            border: 0;
            font-size: 1.9rem;
            color: white;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            position: relative;
            transition: filter 0.2s linear;
            cursor: pointer;
            margin: 0.5rem 0;

            svg {
                position: absolute;
                right: 15px;
                font-size: 2.3rem;
            }

            :hover {
                filter: brightness(0.7);
            }
        }

        button:nth-child(6) {
            background-color: ${props =>props.theme.colors.facebook};
        }

        button:nth-child(7) {
            background-color: ${props =>props.theme.colors.google};
        }

        p {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: 0.5rem;
        }
    }

    @media (max-width: 768px) {
        background-color: white;
        height: 100%;

        form {
            max-width: 100%;

            button {
                font-size: 1.5rem;
                padding: 15px 20px;

                svg {
                    font-size: 1.7rem;
                }
            }
        }
    }
`