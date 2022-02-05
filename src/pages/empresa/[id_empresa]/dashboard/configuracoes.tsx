import axios from "axios";
import { NextPageContext } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../../../components/navbar";
import { AuthContext } from "../../../../contexts/AuthContext";
import { Container, SectionStyled, ConfiguraçõesStyled, PlanoConfigurações } from "../../../../styles/empresa/dashboard";

interface IEmpresa {
    id: number,
    nome: string,
    razao_social: string,
    cnpj: string,
    email: string,
    tel: string
}

interface IPlanoResponse {
    success: boolean,
    plano: IPlano,
    mensagem: string
}

interface IPlano {
    id: number,
    nome : string,
    limite_clientes: number,
    limite_usuarios: number,
    total_clientes: number,
}

export default function Configurações(props: { id_empresa: number }) {
    const {user, enviarEmailRecuperação} = useContext(AuthContext)

    const [message, setMessage] = useState("")
    const [showEmpresa, setShowEmpresa] = useState(false)

    const [nomeUsuário, setNomeUsuário] = useState("")
    const [emailUsuário, setEmailUsuário] = useState<string>('')

    const [nomeEmpresa, setNomeEmpresa] = useState<string>('')
    const [razão_socialEmpresa, setRazão_socialEmpresa] = useState<string>('')
    const [cnpjEmpresa, setCnpjEmpresa] = useState<string>('')
    const [telefoneEmpresa, setTelefoneEmpresa] = useState<string>('')
    const [emailEmpresa, setEmailEmpresa] = useState<string>('')

    const [plano, setPlano] = useState<IPlano>({} as IPlano)

    useEffect(() => {
        if(user){
            setShowEmpresa(user.id_permissao > 2)

            setNomeUsuário(user.nome as string)
            setEmailUsuário(user.email as string)

            const {token} = parseCookies()
            if(token && user.id_permissao > 2){
                axios.get('/api/empresas/' + user.id_empresa, {headers: {authorization: token, id_empresa: props.id_empresa + ""}}).then((response : {data: IEmpresa, status: number}) => {
                    if(response.status == 200){
                        const {nome, razao_social, cnpj, email, tel} = response.data

                        setNomeEmpresa(nome)
                        setRazão_socialEmpresa(razao_social)
                        setCnpjEmpresa(cnpj)
                        setTelefoneEmpresa(tel)
                        setEmailEmpresa(email)
                    }
                })

                axios.get('/api/empresas/' + user.id_empresa + '/plano', {headers: {authorization: token, id_empresa: props.id_empresa + ""}}).then((response : {data: IPlanoResponse, status: number}) => {
                    if(response.data.success){
                        setPlano(response.data.plano)
                    }
                })
            }
        }
    }, [user])

    function clickSalvar(){
        const {token} = parseCookies()

        if(token && user){
            if(user.id_permissao > 2){
                axios.put('/api/empresas/' + user.id_empresa, {
                    nome: nomeEmpresa,
                    razao_social: razão_socialEmpresa,
                    cnpj: cnpjEmpresa,
                    email: emailEmpresa,
                    tel: telefoneEmpresa
                }, {headers: {authorization: token}}).then((response : {data: IEmpresa, status: number}) => {
                    if(response.status == 200){
                        setMessage("Dados alterados com sucesso!")
                    }
                } )
            }else{
                axios.put('/api/usuarios/' + user.id, {
                    nome: nomeUsuário,
                    email: emailUsuário
                }, {headers: {authorization: token}}).then((response : {data: IEmpresa, status: number}) => {
                    if(response.status == 200){
                        setMessage("Dados alterados com sucesso!")
                    }else{
                        console.log(response.data)
                    }
                })
            }
        }
    }

    return(
        <Container>
            <Head>
                <title>Conect-se Atende - Configurações</title>
            </Head>

            <Navbar page="configurações" id_empresa={props.id_empresa}/>

            <SectionStyled>
                <header>
                    <h1>Configurações</h1>
                </header>

                <ConfiguraçõesStyled>
                    <div>
                        <p>{message}</p>
                        <label>
                            Nome
                            <input type="text" defaultValue={nomeUsuário} onChange={(event) => setNomeUsuário(event.target.value)}/>
                        </label>

                        <label>
                            E-mail
                            <input type="email" defaultValue={emailUsuário} onChange={(event) => setEmailUsuário(event.target.value)}/>
                        </label>

                        <a href="#" onClick={() => {enviarEmailRecuperação(user!.email); setMessage("Enviamos para o seu email o link pra troca de senha")}}>Trocar senha</a>

                        {
                            showEmpresa && (
                                <>
                                    <label>
                                        Razão Social
                                        <input type="text" defaultValue={razão_socialEmpresa} onChange={(event) => setRazão_socialEmpresa(event.target.value)}/>
                                    </label>
                
                                    <label>
                                        CNPJ
                                        <input type="text" defaultValue={cnpjEmpresa} onChange={(event) => setCnpjEmpresa(event.target.value)}/>
                                    </label>
                
                                    <label>
                                        E-mail Profissional
                                        <input type="email" defaultValue={emailEmpresa} onChange={(event) => setEmailEmpresa(event.target.value)}/>
                                    </label>
                
                                    <label>
                                        Telefone Profissional
                                        <input type="text" defaultValue={telefoneEmpresa} onChange={(event) => setTelefoneEmpresa(event.target.value)}/>
                                    </label>
                                </>
                            )
                        }

                        <button onClick={clickSalvar}>Salvar</button>
                    </div>

                    {
                        showEmpresa && (
                            <PlanoConfigurações>
                                <h2>Plano</h2>
        
                                <label htmlFor="clientes">Total de Clientes: {plano.total_clientes} / {plano.limite_clientes}</label>
                                <progress id="clientes" value={plano.total_clientes} max={plano.limite_clientes}/>
                            </PlanoConfigurações>
                        )
                    }
                </ConfiguraçõesStyled>
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