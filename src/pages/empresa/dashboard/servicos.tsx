import { NextPageContext } from "next"
import { parseCookies } from "nookies"
import { FiEdit, FiSearch, FiPlus } from "react-icons/fi"

import Navbar from "../../../components/navbar"
import { Container, LineStyled, SectionStyled } from "../../../styles/empresa/dashboard"

export default function Serviços(){
    return(
        <Container>
            <Navbar page="serviços"/>
            
            <SectionStyled>
                <header>
                    <h1>Serviços</h1>
                    <button><FiPlus/>Adicionar Serviço</button>
                </header>

                <main>
                    <label>
                        <input type="text" placeholder="Pesquisar Serviço"/><FiSearch/>
                    </label>

                    <ul>
                        <LineStyled>
                            <div>
                                <h3><b>NOME:</b> Corte Masculino</h3>
                                <p><b>DESCRIÇÃO:</b> Corte desenhado</p>
                                <span><b>R$ 0,00</b></span>
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