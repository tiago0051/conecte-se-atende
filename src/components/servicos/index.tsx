import { ServiçosPrestadosStyled } from "../../styles/empresa/dashboard"
import { FiPlus, FiX } from "react-icons/fi"
import { AnimatePresence, motion } from "framer-motion"
import { InputHTMLAttributes, Key, MouseEventHandler, useEffect, useState } from "react"
import axios from "axios"
import { parseCookies } from "nookies"

interface IServiço {
    id: number,
    nome: String,
    descrição: String,
    valor: number,
}

export default function Servicos({clienteCod, setClienteCod}: {clienteCod: number, setClienteCod: () => void}) {
    const [adicionar, setAdicionar] = useState(false)

    const [serviços, setServiços] = useState<IServiço[]>([])
    const [serviçosList, setServiçosList] = useState<IServiço[]>([])
    const [serviçoSelecionado, setServiçoSelecionado] = useState<IServiço>({id: 0, nome: "", descrição: "", valor: 0})
    const [valorPago, setValorPago] = useState<number>()

    const [update, setUpdate] = useState(false)

    const [serviçosRecebido, setServiçosRecebido] = useState<IServiço[]>([])

    useEffect(() => {
        setServiçosList(serviços)
    }, [clienteCod])

    useEffect(() => {
        const {token} = parseCookies()
        axios.get("/api/servicos/listar", {headers: {Authorization: `${token}`}}).then((response: {data: IServiço[]}) => {
            setServiços(response.data)
        })

        axios.get("/api/clientes/" + clienteCod + "/servicos_recebidos", {headers: {Authorization: `${token}`}}).then((response) => {
            if(response.status == 200){
                setServiçosRecebido(response.data)
            }
        })
    }, [update])

    useEffect(() => {
        setServiçosList(serviços)
    }, [serviços])

    useEffect(() => {
        if((document.getElementById("valorServiço") as HTMLInputElement)){
            (document.getElementById("valorServiço") as HTMLInputElement)!.value = serviçoSelecionado.valor.toString()
            setValorPago(serviçoSelecionado.valor)
        }
    }, [serviçoSelecionado])

    function adicionarServiçoFeito(){
        if(serviçoSelecionado.id != 0){
            if(valorPago && valorPago > 0){
                const {token} = parseCookies()

                axios.post("/api/clientes/receber_servico", {serviço: serviçoSelecionado, valor: valorPago, clienteCod, token}).then((response) => {
                    if(response.status == 200){
                        setAdicionar(false)
                        setValorPago(undefined)
                        setServiçoSelecionado({id: 0, nome: "", descrição: "", valor: 0})
                        setUpdate(!update)
                    }else{
                        alert("Erro ao receber serviço")
                    }
                })
            }else{
                alert("Valor inválido")
            }
        }else{
            alert("Selecione um serviço")
        }
    }

    function deletarServiçoFeito(id: number){
        const resposta = window.confirm("Deseja realmente deletar este serviço?");

        if(resposta){
            const {token} = parseCookies()
        

            axios.post("/api/clientes/deletar_servico", {token, id}).then((response) => {
                setUpdate(!update)
            })
        }
    }

    var count = 0;
    return(
            <motion.div animate={{opacity: 1}} initial={{opacity: 0}} transition={{ease: "easeInOut", duration: 0.5}} exit={{opacity: 0}} key="modal">
                <ServiçosPrestadosStyled>
                    <motion.div animate={{rotateX: 0}} initial={{rotateX: 90}} transition={{ease: "easeInOut", duration: 0.4}} exit={{rotateX: 90}} key="moda2l">
                        <FiX onClick={() => setClienteCod()}>Teste</FiX>

                        <h1>Tiago Salgado<button onClick={() => setAdicionar(a => !a)}><FiPlus/></button></h1>

                        <AnimatePresence>
                            {
                                !adicionar &&
                                    <motion.table initial={{x: -500, opacity: 0}} animate={{x: 0, opacity: 1, transition: {delay: 0.5}}} exit={{x: 200, opacity: 0}} transition={{duration: 0.5, ease:"anticipate"}} key="a">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Nome
                                                </th>

                                                <th style={{width: "10px"}}>
                                                    Valor
                                                </th>
                                                <th style={{width: "5px"}}><FiX/></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                serviçosRecebido.map(servico => (
                                                    <tr key={servico.id as Key}>
                                                        <td>
                                                            {servico.nome}
                                                        </td>
        
                                                        <td>
                                                            {servico.valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
                                                        </td>
                                                        <td><FiX onClick={event => deletarServiçoFeito(servico.id)}/></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </motion.table>
                            }

                            {
                                adicionar &&
                                    <motion.div initial={{x: -500, opacity: 0}} animate={{x: 0, opacity: 1, transition: {delay: 0.5}}} exit={{x: 500, opacity: 0}} transition={{duration: 0.5, ease:"anticipate"}} key="b" >
                                        <input type="text" placeholder="Pesquisar Serviço" onChange={event => setServiçosList(serviços.filter(s => s.nome.toLowerCase().includes(event.target.value.toLowerCase())))}/>

                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Nome</th>
                                                    <th>Descrição</th>
                                                    <th>Valor</th>
                                                </tr>
                                            </thead>

                                            <tbody id="body">
                                                {
                                                    serviçosList.map((serviço: IServiço) => {
                                                        if(count < 4){
                                                            count++
                                                            return (
                                                                <tr key={serviço.id as Key} onClick={(event) => setServiçoSelecionado(serviços.filter(servico => servico.id == parseInt((event.target as HTMLElement).parentElement!.id))[0])} id={serviço.id.toString()}>
                                                                    <td>{serviço.nome}</td>
                                                                    <td>{serviço.descrição}</td>
                                                                    <td>{serviço.valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
                                                                </tr>
                                                            )
                                                        }
                                                    })
                                                }
                                            </tbody>
                                        </table>

                                        <div>
                                            <p><b>Serviço Selecionado:</b> {serviçoSelecionado.nome}</p>
                                            <div>
                                                <input type="number" placeholder="Valor Pago" id="valorServiço" onChange={event => setValorPago(parseFloat(event.target.value))}/>

                                                <button onClick={adicionarServiçoFeito}>Adicionar</button>
                                            </div>
                                        </div>
                                    </motion.div>
                            }
                        </AnimatePresence>
                    </motion.div>
                </ServiçosPrestadosStyled>
            </motion.div>
    )
}