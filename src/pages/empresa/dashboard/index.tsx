import { NextPageContext } from "next"
import { parseCookies } from "nookies"
import { FiUserPlus } from "react-icons/fi"

import { Container, SectionStyled } from "../../../styles/empresa/dashboard"

import Navbar from "../../../components/navbar"

export default function Dashboard(){
    return (
        <Container>
            <Navbar page="clientes"/>

            <SectionStyled>
                <header>
                    <h1>Clientes</h1>
                    <button><FiUserPlus/>Adicionar Cliente</button>
                </header>

                <main>
                    <input type="text" placeholder="Pesquisar"/>
                </main>
            </SectionStyled>
        </Container>
    )
}

export async function getServerSideProps(ctx: NextPageContext){
    const {token} = parseCookies(ctx)
    if(!token){
        return {
            redirect: {
                destination: '/empresa/login',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}