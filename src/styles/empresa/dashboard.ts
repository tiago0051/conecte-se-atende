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

            svg {
                margin-right: 1rem;
            }
        }
    }

    input {
        font-size: 1.3rem;
        border-radius: 25px;
        padding: 10px;
        border: 1px solid ${props => props.theme.colors.border};
    }
`