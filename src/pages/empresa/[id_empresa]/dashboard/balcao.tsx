import { NextPageContext } from "next"
import Head from "next/head"
import { parseCookies } from "nookies"
import { useState } from "react"
import { FaWindowClose } from "react-icons/fa"
import Navbar from "../../../../components/navbar"
import { StyledBalcão } from "../../../../styles/empresa/balcao"
import { Container, SectionStyled } from "../../../../styles/empresa/dashboard"

interface IProduto {
    id: number,
    nome: string,
    preco: number,
    quantidade: number
}

export default function Balcão(props: {id_empresa: number}) {

    const [items, setItems] = useState<IProduto[]>([])

    function listItems(){
        var itemsList = [...items];
        var count = 10 - items.length
        
        if(count > 0)
            for(var i = 0; i < count; i++)
                itemsList.push({id: -i, nome: "", preco: 0, quantidade: 0})
        return (
            itemsList.map((item) => (
                <tr key={item.id} onContextMenu={(event) => {event.preventDefault(); setItems(i => i.filter(itemL => itemL.id != item.id));}}>
                    <td>{item.nome}</td> 
                    <td>{item.preco > 0 ? item.preco.toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'}) : ""}</td> 
                    <td><FaWindowClose/></td> 
                </tr>
            ))
        )
    }

    return (
        <Container>
            <Head>
                <title>Conect-se Atende - Balcão</title>
            </Head>
            <Navbar page="balcao" id_empresa={props.id_empresa}/>

            <SectionStyled>
                <header>
                    <h1>Balcão</h1>
                </header>

                <StyledBalcão>
                    <div>
                        <label>
                            <p>Funcionário</p>
                            <input type="text" placeholder="Nome do funcionário"/>
                        </label>

                        <label>
                            <p>Cliente</p>
                            <input type="text" placeholder="Nome do cliente"/>
                        </label>
                    </div>

                    <div>
                        <button onClick={() => setItems(a =>  [...a, {id: a.length + 1, nome: "Teste", preco: 40, quantidade: 1}])}>Adicionar Produto</button>
                        <div>Total<br/>{
                            items.reduce((total, item) => total + (item.preco * item.quantidade), 0).toLocaleString('pt-BR', {style: 'currency', 'currency': 'BRL'})
                        }</div>
                    </div>

                    <div>
                        <div>
                            <table>
                                <thead>
                                    <th style={{width: "65%"}}>Nome</th>
                                    <th style={{width: "30%"}}>Preço</th>
                                    <th> </th>
                                </thead>

                                <tbody>
                                    {
                                        listItems()
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <label>
                                <p>Desconto</p>
                                <input type="number"/>
                            </label>
                            <button>Cadastrar Venda</button>
                        </div>
                    </div>
                </StyledBalcão>
            </SectionStyled>
        </Container>
    )
}

export async function getServerSideProps(ctx: NextPageContext){
    const {token} = parseCookies(ctx)
    var id_empresa = parseInt(ctx.query.id_empresa as string);

    if(!token || !id_empresa){
        return {
            redirect: {
                destination: '/empresa/login',
                permanent: false,
            }
        }
    }

    return {
        props: {id_empresa}
    }
}