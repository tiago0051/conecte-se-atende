import { NextPageContext } from "next"
import { parseCookies } from "nookies"
import { FiEdit, FiSearch, FiPlus } from "react-icons/fi"
import { useRouter } from "next/router"
import { Key, useEffect, useState } from "react"
import axios from "axios"

import Navbar from "../../../components/navbar"
import { Container, LineStyled, SectionStyled } from "../../../styles/empresa/dashboard"
import { motion } from "framer-motion"

interface IServiço {
    id: number,
    nome: string,
    descrição: string,
    valor: number
}

export default function Serviços(){
    const router = useRouter()

    const [serviços, setServiços] = useState<IServiço[]>([])
    const [serviçosList, setServiçosList] = useState<IServiço[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const {token} = parseCookies()

        axios.get("/api/servicos/listar", {headers: {Authorization: `${token}`}}).then(response => {
            setServiços(response.data)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setServiçosList(serviços)
    }, [serviços])

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
                        <input type="text" placeholder="Pesquisar Serviço" onChange={event => setServiçosList(serviços.filter(serviço => serviço.nome.toLowerCase().includes(event.target.value.toLowerCase())))}/><FiSearch/>
                    </label>

                    <ul>
                        {
                            loading ? <motion.h1 animate={{opacity: 1}} initial={{opacity: 0}} transition={{ease: "easeInOut", duration: 2}}>Loading</motion.h1>
                            :
                            serviçosList.map(serviço => (
                                <motion.div key={serviço.id as Key} animate={{x: 0, opacity: 1}} initial={{x: -100, opacity: 0}} transition={{ease: "backInOut", duration: 1}}>
                                    <LineStyled onClick={() => router.push("/empresa/dashboard/servico/" + serviço.id)}>
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
                                </motion.div>
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