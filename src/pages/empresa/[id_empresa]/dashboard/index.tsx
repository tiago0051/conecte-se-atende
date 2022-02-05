import { NextPageContext } from "next"
import { parseCookies } from "nookies"
import { FiUserPlus, FiSearch, FiEdit } from "react-icons/fi"
import {useRouter} from "next/router"
import axios from "axios"
import { Key, useEffect, useState } from "react"
import {AnimatePresence, motion} from "framer-motion";

import { Container, SectionStyled, LineStyled } from "../../../../styles/empresa/dashboard"
import Navbar from "../../../../components/navbar"
import Serviços from "../../../../components/servicos"
import Loading from "../../../../components/loading"
import Head from "next/head"

interface ICliente {
    id: number,
    nome: String,
    email: String,
    cpf: String
}

export default function Dashboard(props : {id_empresa: number}){
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

        axios.get("/api/clientes/0", {headers: {Authorization: `${token}`, id_empresa: props.id_empresa + ""}}).then(response => {
            if(response.data.success){
                setClientes(response.data.clientes)
                setLoading(false)
            }
        })
    }, [])

    useEffect(() => {
        setClientesList(clientes)
    }, [clientes])

    return (
        <Container>
            <Head>
                <title>Conect-se Atende - Clientes</title>
            </Head>
            <Navbar page="clientes" id_empresa={props.id_empresa}/>

            <SectionStyled>
                <header>
                    <h1>Clientes</h1>
                    <button onClick={() => router.push("/empresa/"+ props.id_empresa +"/dashboard/cliente/0")}><FiUserPlus/>Adicionar Cliente</button>
                </header>

                <main>
                    <label>
                        <input type="text" placeholder="Pesquisar Cliente" onChange={event => setClientesList(clientes.filter(cliente => cliente.nome.toLowerCase().includes(event.target.value.toLowerCase())))}/><FiSearch/>
                    </label>

                    <ul>
                        {
                            !loading &&
                            clientesList.map(cliente => (
                                <motion.div key={cliente.cpf as Key} animate={{x: 0, opacity: 1}} initial={{x: -100, opacity: 0}} transition={{ease: "backInOut", duration: 1}}>
                                    <LineStyled>
                                        <div onClick={() => setClienteAberto({id: cliente.id, nome: cliente.nome})}>
                                            <h3><b>NOME:</b> {cliente.nome}</h3>
                                            <p><b>CPF:</b> {cliente.cpf}</p>
                                        </div>

                                        <div>
                                            <FiEdit onClick={() => { router.push(`/empresa/${props.id_empresa}/dashboard/cliente/` + cliente.id); fecharCliente();}}/>
                                        </div>
                                    </LineStyled>
                                </motion.div>
                            ))
                        }
                    </ul>
                    <Loading loading={loading.toString()}/>
                </main>
            </SectionStyled>

            <motion.div style={{zIndex: 3}}>
                <AnimatePresence>
                {
                    clienteAberto.id > 0 && <Serviços cliente={clienteAberto} id_empresa={props.id_empresa} setClienteCod={fecharCliente}/>
                }
                </AnimatePresence>
            </motion.div>
        </Container>
    )
}

export async function getServerSideProps(ctx: NextPageContext){
    const {token} = parseCookies(ctx)

    var id_empresa = parseInt(ctx.query.id_empresa as string);

    if(!token){
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