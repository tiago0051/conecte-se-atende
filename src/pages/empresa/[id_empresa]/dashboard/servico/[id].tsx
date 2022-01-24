import axios from "axios";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { SyntheticEvent, useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { useRouter } from "next/router";
import Navbar from "../../../../../components/navbar";
import { ConfiguraçõesStyled, Container, SectionStyled } from "../../../../../styles/empresa/dashboard";
import { motion } from "framer-motion";

interface IServiço {
    success: boolean,
    mensagem: string,
    serviço: {
        id: number,
        nome: string,
        descrição: string,
        valor: number,
    }
}

export default function Editar({idServiço, id_empresa} : {idServiço: number, id_empresa: number}) {
    const router = useRouter()

    const [nome, setNome] = useState<string>()
    const [descrição, setDescrição] = useState<string>()
    const [valor, setValor] = useState<number>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const {token} = parseCookies();

        if(idServiço === 0){
            setLoading(false)
        }else if(idServiço > 0){
            axios.get(`/api/servicos/${idServiço}`, {headers: {authorization: token, id_empresa: id_empresa + ""}}).then((response: {data: IServiço, status: number}) => {
                if(response.data.success){
                    setNome(response.data.serviço.nome);
                    setDescrição(response.data.serviço.descrição)
                    setValor(response.data.serviço.valor)
                    setLoading(false)
                }
            })
        }
    }, [])

    function handleSubmit(event : SyntheticEvent){
        event.preventDefault();

        const {token} = parseCookies();

        const serviço = {
            id: idServiço,
            nome,
            descrição,
            valor
        }

        axios.put(`/api/servicos/${idServiço}`, serviço, {headers: {Authorization: token, id_empresa: id_empresa + ""}}).then((response) => {
            if(response.status == 500){
                alert("Erro ao salvar")
            }else{
                router.back()
            }
        })
    }

    return(
        <Container>
            <Navbar page="serviço" id_empresa={id_empresa}/>

            <SectionStyled>
                <header>
                    <h1>{idServiço != 0 ? "Editar Serviço" : "Novo Serviço"}</h1>
                    <button onClick={() => {(document.getElementById("salvar") as HTMLInputElement).click(); (document.getElementById("salvar") as HTMLInputElement).disabled = true}}><FiSave/>Salvar</button>
                </header>

                <ConfiguraçõesStyled>
                    <motion.form id="form" onSubmit={handleSubmit} initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{ease: "easeInOut", duration: 2}}>
                        <label><p>Nome<b>*</b></p>
                            <input type="text" required value={nome} onChange={event => setNome(event.target.value)}/>
                        </label>

                        <label><p>Descrição<b>*</b></p>
                            <input type="text" required defaultValue={descrição} onChange={event => setDescrição(event.target.value)}/>
                        </label>

                        <label><p>Valor<b>*</b></p>
                            <input type="number" required defaultValue={valor} onChange={event => setValor(Number.parseFloat(event.target.value))}/>
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

    var idServiço = parseInt(ctx.query.id as string);
    var id_empresa = parseInt(ctx.query.id_empresa as string);
    
    if(!idServiço)idServiço = 0

    return {
        props: {
            idServiço,
            id_empresa
        }
    }
}