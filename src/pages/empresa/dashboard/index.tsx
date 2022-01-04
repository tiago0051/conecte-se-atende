import { NextPageContext } from "next"
import { parseCookies } from "nookies"

import { Container } from "../../../styles/empresa/dashboard"

import Navbar from "../../../components/navbar"

export default function Dashboard(){
    return (
        <Container>
            <Navbar page="clientes"/>

            <section>
                Dashboard
            </section>
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