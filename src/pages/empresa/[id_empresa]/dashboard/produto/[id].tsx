import axios from "axios";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { SyntheticEvent, useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { useRouter } from "next/router";
import Navbar from "../../../../../components/navbar";
import { ConfiguraçõesStyled, Container, SectionStyled } from "../../../../../styles/empresa/dashboard";
import { motion } from "framer-motion";

interface IResponse {
    success: boolean,
    mensagem: string,
    produto: IProduto
}

interface IProduto {
    id_produto: number,
    tipo_produto: number,
    nome: string,
    descricao?: string,
    valor_custo?: number,
    valor_venda_varejo: number,
    valor_venda_atacado?: number
}

export default function Editar({idProduto, id_empresa} : {idProduto: number, id_empresa: number}) {
    const router = useRouter()

    const [tipo_produto, setTipo_produto] = useState(1)
    const [nome, setNome] = useState<string>("")
    const [descrição, setDescrição] = useState<string>()
    const [valorCusto, setValorCusto] = useState<number>()
    const [valorVendaVarejo, setValorVendaVarejo] = useState<number>()
    const [valorVendaAtacado, setValorVendaAtacado] = useState<number>()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const {token} = parseCookies();

        if(idProduto === 0){
            setLoading(false)
        }else if(idProduto > 0){
            axios.get(`/api/produtos/${idProduto}`, {headers: {authorization: token, id_empresa: id_empresa + ""}}).then((response: {data: IResponse, status: number}) => {
                if(response.data.success){
                    const produto = response.data.produto

                    setTipo_produto(produto.tipo_produto)
                    setNome(produto.nome);
                    setDescrição(produto.descricao)
                    setValorCusto(produto.valor_custo)
                    setValorVendaVarejo(produto.valor_venda_varejo)
                    setValorVendaAtacado(produto.valor_venda_atacado)

                    setLoading(false)
                }
            })
        }
    }, [])

    function handleSubmit(event : SyntheticEvent){
        event.preventDefault();

        const {token} = parseCookies();

        const produto = {
            id: idProduto,
            tipo_produto,
            nome,
            descricao: descrição,
            valor_custo: valorCusto,
            valor_venda_varejo: valorVendaVarejo,
            valor_venda_atacado: valorVendaAtacado
        }

        axios.put(`/api/produtos/${idProduto}`, produto, {headers: {Authorization: token, id_empresa: id_empresa + ""}}).then((response) => {
            if(response.status == 500){
                alert("Erro ao salvar")
            }else{
                router.back()
            }
        })
    }

    return(
        <Container>
            <Navbar page="produtos" id_empresa={id_empresa}/>

            <SectionStyled>
                <header>
                    <h1>{idProduto != 0 ? "Editar Produto" : "Novo Produto"}</h1>
                    <button onClick={() => {(document.getElementById("salvar") as HTMLInputElement).click(); (document.getElementById("salvar") as HTMLInputElement).disabled = false}}><FiSave/>Salvar</button>
                </header>

                <ConfiguraçõesStyled>
                    <motion.form id="form" onSubmit={handleSubmit} initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{ease: "easeInOut", duration: 2}}>
                        <fieldset>
                            <legend>O produto é?</legend>
                            <label><p>Serviço</p>
                                <input type="checkbox" name="serviço" id="serviço" checked={tipo_produto == 2} onChange={() => setTipo_produto(tipo => tipo == 1 ? 2 : 1)}/>
                            </label>

                            <label><p>Produto</p>
                                <input type="checkbox" name="produto" id="produto" checked={tipo_produto == 1} onChange={() => setTipo_produto(tipo => tipo == 1 ? 2 : 1)}/>
                            </label>
                        </fieldset>

                        <label><p>Nome<b>*</b></p>
                            <input type="text" required value={nome} onChange={event => setNome(event.target.value)}/>
                        </label>

                        <label><p>Descrição<b>*</b></p>
                            <input type="text" required defaultValue={descrição} onChange={event => setDescrição(event.target.value)}/>
                        </label>

                        <label><p>Valor de Custo</p>
                            <input type="number" defaultValue={valorCusto} onChange={event => setValorCusto(Number.parseFloat(event.target.value))}/>
                        </label>

                        <label><p>Valor de Venda Varejo<b>*</b></p>
                            <input type="number" required defaultValue={valorVendaVarejo} onChange={event => setValorVendaVarejo(Number.parseFloat(event.target.value))}/>
                        </label>

                        <label><p>Valor de Venda Atacado</p>
                            <input type="number" defaultValue={valorVendaAtacado} onChange={event => setValorVendaAtacado(Number.parseFloat(event.target.value))}/>
                        </label>

                        <input type="submit" id="salvar"/>
                    </motion.form>
                </ConfiguraçõesStyled>
            </SectionStyled>
        </Container>
    )
}

export function getServerSideProps(ctx: NextPageContext){
    const {token} = parseCookies(ctx)
    if(!token){
        return {
            redirect: {
                destination: '/empresa/login',
                permanent: false,
            }
        }
    }

    var idProduto = parseInt(ctx.query.id as string);
    var id_empresa = parseInt(ctx.query.id_empresa as string);
    
    if(!idProduto)idProduto = 0

    return {
        props: {
            idProduto,
            id_empresa
        }
    }
}