import axios from "axios";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import React from "react";
import { FiSave } from "react-icons/fi";
import { useRouter } from "next/router";

import Navbar from "../../../../components/navbar";
import { Container, SectionStyled, ConfiguraçõesStyled } from "../../../../styles/empresa/dashboard";

interface IProps {
    cliente?: ICliente; 
}

interface ICliente {
    nome: string,
    cpf: string,
    email: string,
    whatsapp: string,
    telefone: string,
    endereco: string,
    aniversario: string,
}

export default function Editar({cliente} : IProps){
    const router = useRouter();

    const [nome, setNome] = React.useState(cliente?.nome);
    const [email, setEmail] = React.useState(cliente?.email);
    const [cpf, setCpf] = React.useState(cliente?.cpf);
    const [whatsapp, setWhatsapp] = React.useState(cliente?.whatsapp);
    const [telefone, setTelefone] = React.useState(cliente?.telefone);
    const [endereco, setEndereco] = React.useState(cliente?.endereco);
    const [aniversario, setAniversario] = React.useState(cliente?.aniversario);


    function handleSubmit(event: React.SyntheticEvent){
        event.preventDefault()

        const {token} = parseCookies()

        const cliente = {
            nome,
            cpf,
            email,
            whatsapp,
            telefone,
            endereco,
            aniversario,
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
                    <h1>{cliente ? "Editar Cliente" : "Novo Cliente"}</h1>
                    <button onClick={() => (document.getElementById("salvar") as HTMLInputElement).click()}><FiSave/>Salvar</button>
                </header>

                <ConfiguraçõesStyled>
                    <form id="form" onSubmit={handleSubmit}>
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
                            <input type="text" defaultValue={endereco} onChange={event => setEndereco(event.target.value)}/>
                        </label>

                        <label>Data de Aniversario
                            <input type="date" defaultValue={aniversario} onChange={event => setAniversario(event.target.value)}/>
                        </label>

                        <input type="submit" id="salvar"/>
                    </form>
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

    const idCliente = ctx.query.id;

    if(idCliente == "0"){
        return {
            props: {}
        }
    }

    return {
        props: {}
    }
}