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
    }
    
    @media (max-width: 768px) {
        nav:nth-child(1) {
            width: 100vw;
            height: 80px;
            position: fixed;
            bottom: 0;
        }

        section:nth-child(2) {
            width: 100vw;
            height: calc(100vh - 80px);
        }
    }
`

export const NavStyled = styled.nav`
    display: flex;
    z-index: 1;
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
        width: 100%;
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
        transition: filter .2s linear;

        svg {
            margin-right: 0.5rem;
            font-size: 2rem;
        }

        :hover {
            filter: brightness(1.5);
        }
    }

    a {
        color: ${props => props.theme.colors.background};
        border-bottom: 2px solid ${props => props.theme.colors.secondary};
        text-decoration: none;
        transition: border 0.2s linear;
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
            padding: 0;
            height: 300px;

            li {
                display: flex;
                flex-direction: column;
                height: 100%;
                margin: 0;
                font-size: 1.5rem;
            }
        }
    }
`

interface IPropsLink {
    selected?: boolean
}

export const NavBarLink = styled.li<IPropsLink>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background-color: ${props => props.theme.colors.secondary};
    filter: ${props => props.selected ? "brightness(1.5)" : "none"};
    padding: 10px;

    width: 100%;
`

export const SectionStyled = styled.section`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    main {
        position: relative;
        min-height: 80%;
    }

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

export const LineStyled = styled.li`
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
        z-index: 2;

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

    > p {
        color: ${props => props.theme.colors.text};
        margin: 1rem 0;
    }

    > a {
        margin-bottom: 1rem;
        
    }

    input {
        border-radius: 5px;
        width: 800px;
    }

    textarea {
        font-size: 1rem;
        height: 10rem;
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
        cursor: pointer;
        transition: filter 0.1s linear;

        :hover {
            filter: brightness(1.2);
        }
    }

    input[type="submit"]{
        display: none;
    }

    @media (max-width: 768px) {
        input {
            width: 100%;
        }

        textarea {
            width: 100%;
        }
    }
`

export const ServiçosPrestadosStyled = styled.main`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(0, 0, 0, 0.8);
    overflow: hidden;

    > div {
        width: 800px;
        height: 700px;
        background-color: ${props => props.theme.colors.background2};
        border-radius: 10px;
        position: relative;
        padding: 20px;

        > svg {
            position: absolute;
            right: 20px;
            top: 20px;
            cursor: pointer;
        }

        > h1 {
            margin-bottom: 2rem;
            display: flex;

            > button {
                border-radius: 50%;
                width: 40px;
                height: 40px;
                margin-left: 1rem;
                border: 0;
                background-color: ${props => props.theme.colors.secondary};
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: filter 0.1s linear;

                :hover {
                    filter: brightness(1.2);
                }
            }
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            width: 70px;
            padding: 5px;
            background-color: ${props => props.theme.colors.secondary};
            color: ${props => props.theme.colors.background2};
            border: 1px solid ${props => props.theme.colors.border};
        }

        tr {
            width: 100%;
            margin: -10px 0;
        }

        td {
            max-width: 0;
            overflow: hidden;
            padding: 5px 10px;
            text-align: center;
            border: 1px solid ${props => props.theme.colors.border};
        }

        svg {
            font-size: 1.5rem;
            cursor: pointer;

            :hover {
                color: ${props => props.theme.colors.secondary};
            }
        }

        > div {
            > input {
                border-radius: 20px;
                font-size: 1.5rem;
                padding: 5px 20px;
                border: 1px solid ${props => props.theme.colors.border};
                text-align: center;
                margin-bottom: 1rem;

                :focus {
                    border: 1px solid ${props => props.theme.colors.secondary};
                }

                ::placeholder {
                    text-align: center;
                }
            }

            > div {
                margin-top: 1rem;

                p {
                    font-size: 1.2rem;
                    margin: 2rem 0;
                }

                > div {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 1rem;

                    > input {
                        border-radius: 5px;
                        width: 150px;
                        font-size: 1.5rem;
                        padding: 0.5rem 10px;
                        border: 1px solid ${props => props.theme.colors.border};
                    }

                    > button {
                        background-color: ${props => props.theme.colors.secondary};
                        border-radius: 5px;
                        font-size: 2rem;
                        color: ${props => props.theme.colors.background2};
                        border: 0;
                        padding: 5px 10px;
                        cursor: pointer;

                        :hover {
                            filter: brightness(1.2);
                        }
                    }
                }
            }
        }
    }
`