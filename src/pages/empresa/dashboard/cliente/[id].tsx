import axios from "axios";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { FiSave } from "react-icons/fi";
import { useRouter } from "next/router";

import Navbar from "../../../../components/navbar";
import { Container, SectionStyled, ConfiguraçõesStyled } from "../../../../styles/empresa/dashboard";
import { motion } from "framer-motion";

interface IProps {
    idCliente: number; 
}

interface ICliente {
    nome: string,
    cpf: string,
    email: string,
    whatsapp: string,
    telefone: string,
    endereço: string,
    aniversario: string,
    obs: string
}

export default function Editar({idCliente} : IProps){
    const router = useRouter();

    const [nome, setNome] = React.useState<string>();
    const [email, setEmail] = React.useState<string>();
    const [cpf, setCpf] = React.useState<string>();
    const [whatsapp, setWhatsapp] = React.useState<string>();
    const [telefone, setTelefone] = React.useState<string>();
    const [endereço, setEndereço] = React.useState<string>();
    const [aniversario, setAniversario] = React.useState<string>();
    const [obs, setObs] = React.useState<string>();

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const {token} = parseCookies();

        if(idCliente === 0){
            setLoading(false)
        }else if(idCliente > 0){
            axios.get(`/api/clientes/${idCliente}`, {headers: {authorization: token}}).then((response: {data: ICliente, status: number}) => {
                if(response.status == 200){

                    const aniversario = response.data.aniversario.substring(0, 10)

                    console.log(response.data)

                    setNome(response.data.nome);
                    setEmail(response.data.email);
                    setCpf(response.data.cpf);
                    setWhatsapp(response.data.whatsapp);
                    setTelefone(response.data.telefone);
                    setEndereço(response.data.endereço);
                    setAniversario(aniversario);
                    setObs(response.data.obs);
                    setLoading(false)
                }
            })
        }
    }, [])

    function handleSubmit(event: React.SyntheticEvent){
        event.preventDefault()

        const {token} = parseCookies()

        const cliente = {
            id: idCliente,
            nome,
            cpf,
            email,
            whatsapp,
            telefone,
            endereço,
            aniversario,
            obs
        }

        axios.post("/api/clientes/editar", {token, cliente}).then((response) => {
            if(response.status == 500){
                alert("Erro ao salvar")
            }else{
                router.push("/empresa/dashboard")
            }
        })
    }

    return(
        <Container>
            <Navbar page="clientes"/>

            <SectionStyled>
                <header>
                    <h1>{idCliente != 0 ? "Editar Cliente" : "Novo Cliente"}</h1>
                    <button onClick={() => {(document.getElementById("salvar") as HTMLInputElement).click(); (document.getElementById("salvar") as HTMLInputElement).disabled = true}}><FiSave/>Salvar</button>
                </header>

                <ConfiguraçõesStyled>
                    <motion.form id="form" onSubmit={handleSubmit} initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{ease: "easeInOut", duration: 2}}>
                        <label><p>Nome<b>*</b></p>
                            <input type="text" required defaultValue={nome} onChange={event => setNome(event.target.value)}/>
                        </label>

                        <label><p>E-mail<b>*</b></p>
                            <input type="email" required defaultValue={email} onChange={event => setEmail(event.target.value)}/>
                        </label>

                        <label>CPF
                            <input type="text" defaultValue={cpf} onChange={event => setCpf(event.target.value)}/>
                        </label>

                        <label><p>WhatsApp<b>*</b></p>
                            <input type="tel" pattern="[0-9]{11}" required defaultValue={whatsapp} onChange={event => setWhatsapp(event.target.value)}/>
                        </label>

                        <label>Telefone
                            <input type="tel" pattern="[0-9]{11}" defaultValue={telefone} onChange={event => setTelefone(event.target.value)}/>
                        </label>

                        <label>Endereço
                            <input type="text" defaultValue={endereço} onChange={event => setEndereço(event.target.value)}/>
                        </label>

                        <label>Data de Aniversario
                            <input type="date" defaultValue={aniversario} onChange={event => setAniversario(event.target.value)}/>
                        </label>

                        <label>Obervação
                            <textarea defaultValue={obs} onChange={event => setObs(event.target.value)}/>
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

    var idCliente = parseInt(ctx.query.id as string);
    
    if(!idCliente)idCliente = 0

    return {
        props: {
            idCliente
        }
    }
}