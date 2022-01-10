import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../../components/navbar";
import { AuthContext } from "../../../contexts/AuthContext";
import { Container, SectionStyled, ConfiguraçõesStyled } from "../../../styles/empresa/dashboard";

export default function Configurações(){
    const {user} = useContext(AuthContext)

    const [showEmpresa, setShowEmpresa] = useState(false)

    useEffect(() => {
        if(user){
            setShowEmpresa(user.id_permissao > 2)
        }
    }, [user])

    return(
        <Container>
            <Navbar page="configurações"/>

            <SectionStyled>
                <header>
                    <h1>Configurações</h1>
                </header>

                <ConfiguraçõesStyled>
                    <label>
                        E-mail
                        <input type="email"/>
                    </label>

                    <label>
                        Senha
                        <input type="password"/>
                    </label>
                    <label>

                        Confirmar Senha
                        <input type="password"/>
                    </label>

                    {
                        showEmpresa && (
                            <>
                                <label>
                                    Razão Social
                                    <input type="text"/>
                                </label>
            
                                <label>
                                    CNPJ
                                    <input type="text"/>
                                </label>
            
                                <label>
                                    E-mail Profissional
                                    <input type="email"/>
                                </label>
            
                                <label>
                                    Telefone Profissional
                                    <input type="text"/>
                                </label>
                            </>
                        )
                    }

                    <button>Salvar</button>
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

    return {
        props: {}
    }
}