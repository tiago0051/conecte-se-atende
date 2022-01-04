import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import Navbar from "../../../components/navbar";
import { Container } from "../../../styles/empresa/dashboard";

export default function Configurações(){
    return(
        <Container>
            <Navbar page="configurações"/>

            <section>
                Configurações
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