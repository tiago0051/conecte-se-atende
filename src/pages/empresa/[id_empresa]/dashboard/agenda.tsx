import { NextPageContext } from "next"
import Head from "next/head"
import { parseCookies } from "nookies"
import Navbar from "../../../../components/navbar"
import { Container, SectionStyled } from "../../../../styles/empresa/dashboard"

export default function Agenda(props: {id_empresa: number}) {
    return (
        <Container>
            <Head>
                <title>Conect-se Atende - Agenda</title>
            </Head>
            <Navbar page="agenda" id_empresa={props.id_empresa}/>

            <SectionStyled>
                <header>
                    <h1>Agenda</h1>
                </header>
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

    var id_empresa = parseInt(ctx.query.id_empresa as string);

    return {
        props: {id_empresa}
    }
}