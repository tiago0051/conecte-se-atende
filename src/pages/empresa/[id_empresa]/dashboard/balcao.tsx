import { NextPageContext } from "next"
import Head from "next/head"
import { parseCookies } from "nookies"
import Navbar from "../../../../components/navbar"
import { Container, SectionStyled } from "../../../../styles/empresa/dashboard"

export default function Balcão(props: {id_empresa: number}) {
    return (
        <Container>
            <Head>
                <title>Conect-se Atende - Balcão</title>
            </Head>
            <Navbar page="balcao" id_empresa={props.id_empresa}/>

            <SectionStyled>
                <header>
                    <h1>Balcão</h1>
                </header>
            </SectionStyled>
        </Container>
    )
}

export async function getServerSideProps(ctx: NextPageContext){
    const {token} = parseCookies(ctx)
    var id_empresa = parseInt(ctx.query.id_empresa as string);

    if(!token || !id_empresa){
        return {
            redirect: {
                destination: '/empresa/login',
                permanent: false,
            }
        }
    }

    return {
        props: {id_empresa}
    }
}