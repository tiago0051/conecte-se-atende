import { NextPageContext } from "next"
import { parseCookies } from "nookies"
import { FiEdit, FiSearch, FiPlus } from "react-icons/fi"
import { useRouter } from "next/router"
import { Key, useEffect, useState } from "react"
import axios from "axios"

import Navbar from "../../../../components/navbar"
import { Container, LineStyled, SectionStyled } from "../../../../styles/empresa/dashboard"
import { motion } from "framer-motion"
import Loading from "../../../../components/loading"
import Head from "next/head"

interface IProduto {
    id_produto: number,
    tipo_produto: number,
    nome: string,
    descricao?: string,
    valor_custo?: number,
    valor_venda_varejo: number,
    valor_venda_atacado?: number
}

export default function Serviços(props : {id_empresa: number}) {
    const router = useRouter()

    const [produtos, setProdutos] = useState<IProduto[]>([])
    const [produtosList, setProdutosList] = useState<IProduto[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const {token} = parseCookies()

        axios.get("/api/produtos/0", {headers: {Authorization: `${token}`, id_empresa: props.id_empresa + ""}}).then(response => {
            if(response.data.success){
                console.log(response.data.produtos)
                setProdutos(response.data.produtos)
                setLoading(false)
            }else{
                alert("Erro ao carregar os produtos")
                setLoading(false)
            }
        })
    }, [])

    useEffect(() => {
        setProdutosList(produtos)
    }, [produtos])

    return(
        <Container>
            <Head>
                <title>Conect-se Atende - Produtos</title>
            </Head>
            <Navbar page="produtos" id_empresa={props.id_empresa}/>
            
            <SectionStyled>
                <header>
                    <h1>Produtos</h1>
                    <button onClick={() => router.push(`/empresa/${props.id_empresa}/dashboard/produto/0`)}><FiPlus/>Adicionar</button>
                </header>

                <main>
                    <label>
                        <input type="text" placeholder="Pesquisar" onChange={event => setProdutosList(produtos.filter(serviço => serviço.nome.toLowerCase().includes(event.target.value.toLowerCase())))}/><FiSearch/>
                    </label>

                    <ul>
                        {
                            !loading &&
                            produtosList.map(produto => (
                                <motion.div key={produto.id_produto as Key} animate={{x: 0, opacity: 1}} initial={{x: -100, opacity: 0}} transition={{ease: "backInOut", duration: 1}}>
                                    <LineStyled onClick={() => router.push(`/empresa/${props.id_empresa}/dashboard/produto/${produto.id_produto}`)}>
                                        <div>
                                            <h3><b>NOME:</b> {produto.nome}</h3>
                                            <p><b>DESCRIÇÃO:</b> {produto.descricao}</p>
                                            <span><b>
                                                {
                                                    produto.valor_venda_varejo.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
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
                    <Loading loading={loading.toString()}/>
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

    var id_empresa = parseInt(ctx.query.id_empresa as string);

    return {
        props: {id_empresa}
    }
}