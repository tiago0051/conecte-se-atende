import styled from 'styled-components';

export const Container = styled.main`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;

    nav:nth-child(1) {
        width: 250px;
    }

    section:nth-child(2) {
        width: calc(100% - 250px);
        background-color: ${props => props.theme.colors.background};
        padding: 1rem 2rem;
        overflow-y: scroll;
    }
    
    @media (max-width: 768px) {
        nav:nth-child(1) {
            width: 100vw;
            height: 80px;
            position: fixed;
            bottom: 0;
        }

        section:nth-child(2) {
            width: 100%;
        }
    }
`

export const NavStyled = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${props => props.theme.colors.secondary};
    padding: 1rem 0;
    justify-content: space-between;

    div:nth-child(1) {
        width: 160px;
        height: 160px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${props => props.theme.colors.background};
        border-radius: 50%;
    }

    ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        list-style: none;
        color: ${props => props.theme.colors.background};
    }

    li {
        margin: 0.7rem 0;
        font-size: 1.8rem;
        display: flex;
        flex-direction: row;
        align-items: center;

        svg {
            margin-right: 0.5rem;
            font-size: 2rem;
        }
    }

    a {
        color: ${props => props.theme.colors.background};
        border-bottom: 2px solid ${props => props.theme.colors.secondary};
        text-decoration: none;
        transition: border 0.2s linear;

        :hover {
            border-bottom: 2px solid ${props => props.theme.colors.background};
        }
    }

    @media (max-width: 768px) {
        padding: 0;
        margin: 0;

        div:nth-child(1) {
            display: none !important;
        }

        ul {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            margin: 0;
            padding: 0 1rem;

            li {
                display: flex;
                flex-direction: column;

                a {
                    font-size: 1.5rem;
                }
            }
        }
    }
`

interface IPropsLink {
    selected?: boolean
}

export const NavBarLink = styled.li<IPropsLink>`
    a {
        border-bottom: 2px solid ${props => props.selected ? props.theme.colors.background : props.theme.colors.secondary};
    }
`

export const SectionStyled = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;

    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: ${props => props.theme.colors.secondary};
        margin-bottom: 1rem;

        h1 {
            font-size: 3rem;
            font-weight: 700;
            border-bottom: 3px solid ${props => props.theme.colors.secondary};
            padding: 0 3rem 0 0;
        }

        button {
            background-color: ${props => props.theme.colors.secondary};
            border: 0;
            border-radius: 10px;
            padding: 10px 20px;
            font-size: 2rem;
            color: white;
            display: flex;
            flex-direction: row;
            align-items: center;
            transition: filter 0.1s linear;
            cursor: pointer;

            svg {
                margin-right: 1rem;
            }

            :hover {
                filter: brightness(1.2);
            }
        }
    }

    label {
        position: relative;

        > svg {
            position: absolute;
            font-size: 2rem;
            top: -10px;
            right: 15px;
            color: ${props => props.theme.colors.secondary};
        }
    }

    input {
        font-size: 1.3rem;
        border-radius: 25px;
        padding: 10px 55px 10px 20px;
        border: 1px solid ${props => props.theme.colors.border};
        transition: border 0.1s linear;

        ::placeholder {
            text-align: center;
        }

        :focus {
            border: 1px solid ${props => props.theme.colors.secondary};
        }
    }

    ul {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 1rem;
        list-style: none;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 2rem !important; 
        }

        button {
            font-size: 0 !important;
            width: 65px;
            height: 65px;
            position: relative;
            border-radius: 50% !important;
            
            > svg {
                font-size: 1.5rem;
                position: absolute;
            }
        }
    }
`

export const LineStyled = styled.li<ILineStyled>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.colors.border};
    background-color: ${props => props.theme.colors.background2};
    padding: 1rem;
    transition: all 0.1s linear;
    cursor: pointer;
    margin: 1rem 0;

    :hover {
        border: 1px solid ${props => props.theme.colors.secondary};
        box-shadow: 0 0 10px 4px rgb(0, 0, 0, 0.2);
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
        color: ${props => props.theme.colors.border};

        h3 {
            margin-bottom: 10px;
            font-weight: 500;
        }

        span {
            margin-top: 10px;
            font-size: 1.3rem;
            font-weight: 900;
        }

        b {
            font-weight: 700px;
            color: ${props => props.theme.colors.text};
        }
    }

    div > svg {
        font-size: 2rem;
        transition: color 0.1s linear;

        :hover {
            color: ${props => props.theme.colors.secondary};
        }
    }
`

export const ConfiguraçõesStyled = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;

    input {
        border-radius: 5px;
        width: 800px;
    }

    label {
        display: flex;
        flex-direction: column;
        font-weight: 700;
        color: ${props => props.theme.colors.secondary};
        margin-bottom: 1rem;

        > p > b {
            color: red;
            margin-left: 10px;
        }
    }

    button {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.background2};
        border: 0;
        border-radius: 10px;
        font-size: 1.5rem;
        width: 200px;
        padding: 10px;
    }

    input[type="submit"]{
        display: none;
    }
`