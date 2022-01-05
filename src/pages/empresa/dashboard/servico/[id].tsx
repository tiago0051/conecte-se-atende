import axios from "axios";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { SyntheticEvent, useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { useRouter } from "next/router";
import Navbar from "../../../../components/navbar";
import { ConfiguraçõesStyled, Container, SectionStyled } from "../../../../styles/empresa/dashboard";

interface IServiço {
    id: number,
    nome: string,
    descrição: string,
    valor: number,
}

export default function Editar({idServiço} : {idServiço: number}) {
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
            axios.get(`/api/servicos/${idServiço}`, {headers: {authorization: token}}).then((response: {data: IServiço, status: number}) => {
                if(response.status == 200){
                    setNome(response.data.nome);
                    setDescrição(response.data.descrição)
                    setValor(response.data.valor)
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

        axios.post("/api/servicos/editar", {token, serviço}).then((response) => {
            if(response.status == 500){
                alert("Erro ao salvar")
            }else{
                router.push("/empresa/dashboard/servicos")
            }
        })
    }

    return(
        <Container>
            <Navbar page="serviço"/>

            <SectionStyled>
                <header>
                    <h1>{idServiço != 0 ? "Editar Serviço" : "Novo Serviço"}</h1>
                    <button onClick={() => {(document.getElementById("salvar") as HTMLInputElement).click(); (document.getElementById("salvar") as HTMLInputElement).disabled = true}}><FiSave/>Salvar</button>
                </header>

                <ConfiguraçõesStyled>
                    <form id="form" onSubmit={handleSubmit}>
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

    var idServiço = parseInt(ctx.query.id as string);
    
    if(!idServiço)idServiço = 0

    return {
        props: {
            idServiço
        }
    }
}