import { NextPageContext } from "next"
import { parseCookies } from "nookies"
import { FiUserPlus, FiSearch, FiEdit } from "react-icons/fi"
import {useRouter} from "next/router"
import axios from "axios"
import { Key, useEffect, useState } from "react"
import {AnimatePresence, motion} from "framer-motion";

import { Container, SectionStyled, LineStyled } from "../../../styles/empresa/dashboard"
import Navbar from "../../../components/navbar"
import Serviços from "../../../components/servicos"
import Loading from "../../../components/loading"

interface ICliente {
    id: number,
    nome: String,
    email: String,
    cpf: String
}

export default function Dashboard(){
    const router = useRouter()

    const [clientes, setClientes] = useState<ICliente[]>([])
    const [clientesList, setClientesList] = useState<ICliente[]>([])
    const [loading, setLoading] = useState(true)

    const [clienteAberto, setClienteAberto] = useState<{id: number, nome: String}>({id: 0, nome: ""})

    function fecharCliente(){
        setClienteAberto({id: 0, nome: ""})
    }

    useEffect(() => {
        const {token} = parseCookies()

        axios.get("/api/clientes/listar", {headers: {Authorization: `${token}`}}).then(response => {
            setClientes(response.data)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setClientesList(clientes)
    }, [clientes])

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
                        <input type="text" placeholder="Pesquisar Cliente" onChange={event => setClientesList(clientes.filter(cliente => cliente.nome.toLowerCase().includes(event.target.value.toLowerCase())))}/><FiSearch/>
                    </label>

                    <ul>
                        {
                            loading ?
                            <motion.img animate={{opacity: 1}} initial={{opacity: 0}} transition={{ease: "easeInOut", duration: 2}} src="/loading.gif" style={{height: "200px", width: "200px"}}/>
                                :
                            clientesList.map(cliente => (
                                <motion.div key={cliente.cpf as Key} animate={{x: 0, opacity: 1}} initial={{x: -100, opacity: 0}} transition={{ease: "backInOut", duration: 1}}>
                                    <LineStyled>
                                        <div onClick={() => setClienteAberto({id: cliente.id, nome: cliente.nome})}>
                                            <h3><b>NOME:</b> {cliente.nome}</h3>
                                            <p><b>CPF:</b> {cliente.cpf}</p>
                                        </div>

                                        <div>
                                            <FiEdit onClick={() => { router.push("/empresa/dashboard/cliente/" + cliente.id); fecharCliente();}}/>
                                        </div>
                                    </LineStyled>
                                </motion.div>
                            ))
                        }
                    </ul>
                </main>
            </SectionStyled>

            <motion.div style={{zIndex: 3}}>
                <AnimatePresence>
                {
                    clienteAberto.id > 0 && <Serviços cliente={clienteAberto} setClienteCod={fecharCliente}/>
                }
                </AnimatePresence>
            </motion.div>
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