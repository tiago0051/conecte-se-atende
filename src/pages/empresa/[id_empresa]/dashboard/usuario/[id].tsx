import axios from "axios";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { FiSave } from "react-icons/fi";
import { useRouter } from "next/router";

import Navbar from "../../../../../components/navbar";
import { Container, SectionStyled, ConfiguraçõesStyled } from "../../../../../styles/empresa/dashboard";
import { motion } from "framer-motion";

interface IProps {
    idCliente: number,
    id_empresa: number 
}

interface IFuncionário {
    nome: string,
    email: string,
}

export default function Editar({idCliente, id_empresa} : IProps){
    const router = useRouter();

    const [nome, setNome] = React.useState<string>();
    const [email, setEmail] = React.useState<string>();

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const {token} = parseCookies();

        if(idCliente === 0){
            setLoading(false)
        }else if(idCliente > 0){
            axios.get(`/api/clientes/${idCliente}`, {headers: {authorization: token, id_empresa: id_empresa + ""}}).then((response: {data: IFuncionário, status: number}) => {
                if(response.status == 200){

                    setNome(response.data.nome);
                    setEmail(response.data.email);
                    setLoading(false)
                }
            })
        }
    }, [])

    function handleSubmit(event: React.SyntheticEvent){
        setLoading(true)

        event.preventDefault()

        const {token} = parseCookies()

        const funcionario = {
            id: idCliente,
            nome,
            email
        }

        axios.put(`/api/usuarios/${idCliente}`, funcionario, {headers: {authorization: token, id_empresa: id_empresa + ""}}).then((response) => {
            if(response.data.success){
                router.push(`/empresa/${id_empresa}/dashboard/funcionarios`)
            }else{
                alert(response.data.mensagem)
                setLoading(false)
            }
        })
    }

    return(
        <Container>
            <Navbar page="funcionarios" id_empresa={id_empresa}/>

            <SectionStyled>
                <header>
                    <h1>{idCliente != 0 ? "Editar Funcionário" : "Novo Funcionário"}</h1>
                    <button onClick={() => {(document.getElementById("salvar") as HTMLInputElement).click()}}><FiSave/>Salvar</button>
                </header>

                <ConfiguraçõesStyled>
                    <motion.form id="form" onSubmit={handleSubmit} initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{ease: "easeInOut", duration: 2}}>
                        <label><p>Nome<b>*</b></p>
                            <input type="text" required defaultValue={nome} onChange={event => setNome(event.target.value)}/>
                        </label>

                        <label><p>E-mail<b>*</b></p>
                            <input type="email" required defaultValue={email} onChange={event => setEmail(event.target.value)}/>
                        </label>

                        <input type="submit" id="salvar" disabled={loading}/>
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

    var idCliente = parseInt(ctx.query.id as string);
    var id_empresa = parseInt(ctx.query.id_empresa as string);
    
    if(!idCliente)idCliente = 0

    return {
        props: {
            idCliente,
            id_empresa
        }
    }
}