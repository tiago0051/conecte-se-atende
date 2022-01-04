import { NextPageContext } from "next"
import { parseCookies } from "nookies"
import { FiUserPlus, FiSearch, FiEdit } from "react-icons/fi"

import { Container, SectionStyled, LineStyled } from "../../../styles/empresa/dashboard"

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
                    <label>
                        <input type="text" placeholder="Pesquisar Cliente"/><FiSearch/>
                    </label>

                    <ul>
                        <LineStyled>
                            <div>
                                <h3><b>NOME:</b> ANNA CLARA</h3>
                                <p><b>CPF:</b> 1233123123</p>
                            </div>

                            <div>
                                <FiEdit/>
                            </div>
                        </LineStyled>
                    </ul>
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