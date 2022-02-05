import styled from 'styled-components';

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
    
    > svg {
        color: white;
        back
    }

    ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        list-style: none;
        color: ${props => props.theme.colors.background};
        overflow: hidden;
    }

    li {
        margin: 0.7rem 0;
        font-size: 1.8rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        transition: filter .2s linear;
        cursor: pointer;

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
        text-decoration: none;
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

                svg {
                    font-size: 2rem;
                }
            }

            :last-child{
                display: none;
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