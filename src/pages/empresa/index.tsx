import axios from "axios"
import { NextPageContext } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/AuthContext"

interface IResponseListarEmpresas {
    data: {
        success: boolean,
        mensagem: string,
        empresas: [{
            id: number,
            nome: string,
            razao_social: string,
            cnpj: string,
            email: string,
            tel: string,
            id_permissao: number,
            id_plano: number
        }]
    }
}

export default function EscolherEmpresa(){
    const {user} = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        const {token} = parseCookies()

        if(user){
            axios.get(`/api/usuarios/${user?.id}/listarEmpresas`, {headers: {authorization: token}}).then((response: IResponseListarEmpresas) => {
                if(response.data.success){
                    if(response.data.empresas.length > 1){
    
                    }else{
                        router.push(`/empresa/${response.data.empresas[0].id}/dashboard`)
                    }
                }
            })
        }
    })

    return(
        <main>
            <Head>
                <title>Conect-se Atende - Escolha sua Empresa</title>
            </Head>
        </main>
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