import { NextPageContext } from "next"
import Head from "next/head"
import { parseCookies } from "nookies"
import { Key, useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { FiEdit, FiSearch, FiUserPlus } from "react-icons/fi"
import { motion } from "framer-motion"
import axios from "axios"

import Navbar from "../../../../components/navbar"
import { AuthContext } from "../../../../contexts/AuthContext"
import { Container, LineStyled, SectionStyled } from "../../../../styles/empresa/dashboard"
import Loading from "../../../../components/loading"

interface IUsuário {
    id: number,
    user: String,
    nome: String,
    email: String,
    id_empresa?: number,
    id_permissao?: number
}

interface IResponse {
    success: boolean,
    mensagem: string,
    usuarios: IUsuário[]
}

export default function Funcionários(props: {id_empresa: number}) {
    const router = useRouter()
    const {user} = useContext(AuthContext)

    const [funcionarios, setFuncionarios] = useState<IUsuário[]>([])
    const [funcionariosList, setFuncionariosList] = useState<IUsuário[]>([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const {token} = parseCookies()

        if(user?.id_permissao && user.id_permissao >= 3) {
            axios.get("/api/usuarios/0", {headers: {Authorization: `${token}`, id_empresa: props.id_empresa + ""}}).then((response: {data: IResponse}) => {
                if(response.data.success){
                    setFuncionarios(response.data.usuarios)
                    setLoading(false)
                }
            })
        }else{
            router.back()
        }
    }, [])

    useEffect(() => {
        setFuncionariosList(funcionarios)
    }, [funcionarios])

    return (
        <Container>
            <Head>
                <title>Conect-se Atende - Funcionários</title>
            </Head>
            <Navbar page="funcionarios" id_empresa={props.id_empresa}/>

            <SectionStyled>
                <header>
                    <h1>Funcionários</h1>
                    <button onClick={() => router.push("/empresa/"+ props.id_empresa +"/dashboard/usuário/0")}><FiUserPlus/>Adicionar</button>
                </header>

                <main>
                    <label>
                        <input type="text" placeholder="Pesquisar" onChange={event => setFuncionariosList(funcionarios.filter(funcionario => funcionario.nome.toLowerCase().includes(event.target.value.toLowerCase())))}/><FiSearch/>
                    </label>

                    <ul>
                        {
                            !loading &&
                            funcionariosList.map(funcionarios => (
                                <motion.div key={funcionarios.id as Key} animate={{x: 0, opacity: 1}} initial={{x: -100, opacity: 0}} transition={{ease: "backInOut", duration: 1}}>
                                    <LineStyled>
                                        <div onClick={() => { router.push(`/empresa/${props.id_empresa}/dashboard/funcionarios/` + funcionarios.id)}}>
                                            <h3><b>NOME:</b> {funcionarios.nome}</h3>
                                            <p><b>USUÁRIO:</b> {funcionarios.user}</p>
                                        </div>

                                        <div>
                                            <FiEdit/>
                                        </div>
                                    </LineStyled>
                                </motion.div>
                            ))
                        }
                    </ul>
                    <Loading loading={loading.toString()}/>
                </main>
            </SectionStyled>
        </Container>
    )
}

export async function getServerSideProps(ctx: NextPageContext){
    const {token} = parseCookies(ctx)
    var id_empresa = parseInt(ctx.query.id_empresa as string);

    if(!token || !id_empresa){
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