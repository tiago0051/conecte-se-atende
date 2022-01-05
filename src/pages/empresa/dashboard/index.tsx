import { NextPageContext } from "next"
import { parseCookies } from "nookies"
import { FiUserPlus, FiSearch, FiEdit } from "react-icons/fi"
import {useRouter} from "next/router"
import axios from "axios"
import { Key, useEffect, useState } from "react"

import { Container, SectionStyled, LineStyled } from "../../../styles/empresa/dashboard"
import Navbar from "../../../components/navbar"

interface ICliente {
    id: number,
    nome: String,
    email: String,
    cpf: String
}

export default function Dashboard(){
    const router = useRouter()

    const [clientes, setClientes] = useState<ICliente[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const {token} = parseCookies()

        axios.get("/api/clientes/listar", {headers: {Authorization: `${token}`}}).then(response => {
            setClientes(response.data)
            setLoading(false)
        })
    }, [])

    return (
        <Container>
            <Navbar page="clientes"/>

            <SectionStyled>
                <header>
                    <h1>Clientes</h1>
                    <button onClick={() => router.push("/empresa/dashboard/cliente/0")}><FiUserPlus/>Adicionar Cliente</button>
                </header>

                <main>
                    <label>
                        <input type="text" placeholder="Pesquisar Cliente"/><FiSearch/>
                    </label>

                    <ul>
                        {
                            loading ?
                            <>Loading</>
                                :
                            clientes.map(cliente => (
                                <LineStyled key={cliente.cpf as Key} onClick={() => router.push("/empresa/dashboard/cliente/" + cliente.id)}>
                                    <div>
                                        <h3><b>NOME:</b> {cliente.nome}</h3>
                                        <p><b>CPF:</b> {cliente.cpf}</p>
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