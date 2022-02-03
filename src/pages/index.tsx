import axios from "axios"
import Head from "next/head"
import Image from "next/image"
import { FormEvent, useState } from "react"
import { useRouter } from "next/router"
import Loading from "../components/loading"
import { Main } from "../styles"

export default function Home() {
  const router = useRouter()

  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const [emailEmpresa, setEmailEmpresa] = useState('')
  const [emailUsuário, setEmailUsuário] = useState('')
  const [nomeUsuário, setNomeUsuário] = useState('')

  const [loading, setLoading] = useState(false)

  function handleSubmit(event : FormEvent){
    event.preventDefault()

    if(nomeEmpresa === '' || emailEmpresa === '' || emailUsuário === ''){
      alert('Preencha todos os campos')
      return
    }

    setLoading(true)
    axios.post("/api/empresas/cadastrar", {nomeEmpresa, emailEmpresa, emailUsuário, nomeUsuário}).then((response) => {
      setLoading(false)
      alert(response.data.mensagem)
    })
  }

  return (
    <Main>
      <Head>
        <title>Conect-se Atende - Cadastre sua Empresa</title>
        <meta name="description" content="Aplicação de gerenciamento de clientes, serviços e agenda" />
      </Head>

      <div>
        <button onClick={() => router.push("/empresa")}>Dashboard da Empresa</button>
      </div>

      {
        !loading && (
          <form onSubmit={handleSubmit}>
            <Image src="/logo-laranja.svg" alt="Logo" width={200} height={200}/>
            <h1>Cadastre-se</h1>
            <p>É rápido e fácil</p>
            <label>
              <p>Nome da Empresa</p>
              <input type="text" onChange={event => setNomeEmpresa(event.target.value)} required/>
            </label>
    
            <label>
              <p>Email da Empresa</p>
              <input type="email" onChange={event => setEmailEmpresa(event.target.value)} required/>
            </label>
    
            <label>
              <p>Nome do Usuário</p>
              <input type="text" onChange={event => setNomeUsuário(event.target.value)} required/>
            </label>

            <label>
              <p>Email Usuário</p>
              <input type="email" onChange={event => setEmailUsuário(event.target.value)} required/>
            </label>
    
            <input type="submit" value="Cadastrar" id="cadastrar"/>
          </form>
        )
      }

      <Loading loading={loading.toString()}/>
    </Main>
  )
}
