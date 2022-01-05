import { NextPageContext } from "next"
import { parseCookies } from "nookies"
import { FiUserPlus, FiSearch, FiEdit } from "react-icons/fi"
import {useRouter} from "next/router"
import axios from "axios"
import { Key, useEffect, useState } from "react"
import {motion} from "framer-motion";

import { Container, SectionStyled, LineStyled } from "../../../styles/empresa/dashboard"
import Navbar from "../../../components/navbar"
import Serviços from "../../../components/servicos"

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

    const [codClienteAberto, setCodClienteAberto] = useState(0)

    function fecharCliente(){
        setCodClienteAberto(0)
    }

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
                            <motion.h1 animate={{opacity: 1}} initial={{opacity: 0}} transition={{ease: "easeInOut", duration: 2}}>Loading</motion.h1>
                                :
                            clientes.map(cliente => (
                                <motion.div key={cliente.cpf as Key} animate={{x: 0, opacity: 1}} initial={{x: -100, opacity: 0}} transition={{ease: "backInOut", duration: 1}} onClick={() => setCodClienteAberto(cliente.id)}>
                                    <LineStyled>
                                        <div>
                                            <h3><b>NOME:</b> {cliente.nome}</h3>
                                            <p><b>CPF:</b> {cliente.cpf}</p>
                                        </div>

                                        <div>
                                            <FiEdit onClick={() => router.push("/empresa/dashboard/cliente/" + cliente.id)}/>
                                        </div>
                                    </LineStyled>
                                </motion.div>
                            ))
                        }
                    </ul>
                </main>
            </SectionStyled>

            {
                codClienteAberto > 0 ? <Serviços clienteCod={codClienteAberto} setClienteCod={fecharCliente}/> : <></>
            }
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