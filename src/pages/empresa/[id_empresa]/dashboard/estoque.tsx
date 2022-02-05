import { motion } from "framer-motion";
import { NextPageContext } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { Key, useState } from "react";
import { useRouter } from "next/router";

import Navbar from "../../../../components/navbar";
import { Container, LineStyled, SectionStyled } from "../../../../styles/empresa/dashboard";
import { FiEdit, FiSearch } from "react-icons/fi";
import Loading from "../../../../components/loading";

interface IEstoque {
  nome: string,
  descrição: string,
  valor: number,
  id: number
}

export default function Estoque(props : {id_empresa: number}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [estoque, setEstoque] = useState<IEstoque[]>([]);
  const [estoqueList, setEstoqueList] = useState<IEstoque[]>([]);

  return (
    <Container>
      <Head>
          <title>Conect-se Atende - Estoque</title>
      </Head>
      <Navbar page="estoque" id_empresa={props.id_empresa}/>

      <SectionStyled>
          <header>
              <h1>Estoque</h1>
          </header>

          <main>
              <label>
                  <input type="text" placeholder="Pesquisar Serviço" onChange={event => setEstoqueList(estoque.filter(produto => produto.nome.toLowerCase().includes(event.target.value.toLowerCase())))}/><FiSearch/>
              </label>

              <ul>
                  {
                      !loading &&
                      estoqueList.map(produto => (
                          <motion.div key={produto.id as Key} animate={{x: 0, opacity: 1}} initial={{x: -100, opacity: 0}} transition={{ease: "backInOut", duration: 1}}>
                              <LineStyled onClick={() => router.push(`/empresa/${props.id_empresa}/dashboard/estoque/${produto.id}`)}>
                                  <div>
                                      <h3><b>NOME:</b> {produto.nome}</h3>
                                      <p><b>DESCRIÇÃO:</b> {produto.descrição}</p>
                                      <span><b>
                                          {
                                              produto.valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
                                          }
                                      </b></span>
                                  </div>
      
                                  <div>
                                      <FiEdit/>
                                  </div>
                              </LineStyled>
                          </motion.div>
                      )) 
                  }
              </ul>
              <Loading loading={loading.toString()}/>
          </main>
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