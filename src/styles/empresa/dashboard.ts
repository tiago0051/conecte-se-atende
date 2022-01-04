import styled from 'styled-components';

export const Container = styled.main`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;

    nav:nth-child(1) {
        width: 300px;
    }

    section:nth-child(2) {
        width: calc(100% - 300px);
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
        width: 210px;
        height: 210px;
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
        margin: 0.5rem 0;
        font-size: 1.8rem;
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