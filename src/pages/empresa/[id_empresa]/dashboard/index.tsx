import { NextPageContext } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useContext, useEffect } from "react";
import Navbar from "../../../../components/navbar";
import { AuthContext } from "../../../../contexts/AuthContext";
import { Container, SectionStyled } from "../../../../styles/empresa/dashboard";

export default function SejaBemVindo(props: {id_empresa: number}) {
    const {updateUser} = useContext(AuthContext)

    useEffect(() => {
        updateUser()
    }, [])

    return (
        <Container>
            <Head>
                <title>Conect-se Atende - Bem vindo</title>
            </Head>
            <Navbar page="" id_empresa={props.id_empresa}/>

            <SectionStyled>
                <header>
                    <h1>Bem vindo</h1>
                </header>

                <main>
                    <h1>Seja bem vindo ao Conect-se Atende.</h1>
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

    var id_empresa = parseInt(ctx.query.id_empresa as string);

    return {
        props: {id_empresa}
    }
}