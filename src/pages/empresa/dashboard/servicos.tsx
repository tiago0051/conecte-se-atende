import { NextPageContext } from "next"
import { parseCookies } from "nookies"
import { FiEdit, FiSearch, FiPlus } from "react-icons/fi"
import { useRouter } from "next/router"
import { Key, useEffect, useState } from "react"
import axios from "axios"

import Navbar from "../../../components/navbar"
import { Container, LineStyled, SectionStyled } from "../../../styles/empresa/dashboard"

interface IServiço {
    id: number,
    nome: string,
    descrição: string,
    valor: number
}

export default function Serviços(){
    const router = useRouter()

    const [serviços, setServiços] = useState<IServiço[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const {token} = parseCookies()

        axios.get("/api/servicos/listar", {headers: {Authorization: `${token}`}}).then(response => {
            setServiços(response.data)
            setLoading(false)
        })
    }, [])

    return(
        <Container>
            <Navbar page="serviços"/>
            
            <SectionStyled>
                <header>
                    <h1>Serviços</h1>
                    <button onClick={() => router.push("/empresa/dashboard/servico/0")}><FiPlus/>Adicionar Serviço</button>
                </header>

                <main>
                    <label>
                        <input type="text" placeholder="Pesquisar Serviço"/><FiSearch/>
                    </label>

                    <ul>
                        {
                            loading ? <>Loading</>
                            :
                            serviços.map(serviço => (
                                <LineStyled key={serviço.id as Key} onClick={() => router.push("/empresa/dashboard/servico/" + serviço.id)}>
                                    <div>
                                        <h3><b>NOME:</b> {serviço.nome}</h3>
                                        <p><b>DESCRIÇÃO:</b> {serviço.descrição}</p>
                                        <span><b>
                                            {
                                                serviço.valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
                                            }
                                        </b></span>
                                    </div>
        
                                    <div>
                                        <FiEdit/>
                                    </div>
                                </LineStyled>
                            )) 
                        }
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