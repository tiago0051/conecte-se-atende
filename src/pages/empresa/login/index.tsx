import { useState } from 'react';
import Image from 'next/image'
import { useContext } from 'react';
import { useRouter } from 'next/router'
import { NextPageContext } from 'next';
import { destroyCookie } from 'nookies';
import {FiLogIn} from 'react-icons/fi'

import {MainStyled} from '../../../styles/empresa/login';
import { AuthContext } from '../../../contexts/AuthContext';
import Loading from '../../../components/loading';
import Head from 'next/head';

export default function Login(){
    const {signIn, enviarEmailRecuperação} = useContext(AuthContext)
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const [recuperarSenha, setRecuperarSenha] = useState(false);

    async function handleSubmitLogar(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        if(recuperarSenha){
            if(email == ''){
                setError('Preencha o campo de email')
            }else{
                setLoading(true)
                enviarEmailRecuperação(email).then((enviado) => {
                    if(enviado){
                        setError('E-mail enviado com sucesso')
                    }else{
                        setError('Erro ao enviar e-mail')
                    }

                    setLoading(false)
                }).catch(error => {
                    setError('Erro ao enviar e-mail')
                    setLoading(false)
                })
               
            }
        }else{
            setLoading(true)
            signIn(email, senha).then(response => {
                if(response){
                    router.push('/empresa')
                }else{
                    setLoading(false)
                    setError('Usuário ou senha inválidos')
                }
            })
        }
    }

    return (
        <MainStyled>
            <Head>
                <title>Login - Empresa</title>
            </Head>
            {
                !loading && (
                    <form onSubmit={handleSubmitLogar}>
                        <Image src='/logo-laranja.svg' alt='Logo' width='150' height='150' />
        
                        <h1>Login <br/><b style={{fontSize: "1rem"}}>{error}</b></h1>
        
                        <label>
                            E-mail:
                            <input type="email" onChange={event => setEmail(event.target.value)}/>
                        </label>
                        {
                            !recuperarSenha && (
                                <label>
                                    Senha:
                                    <input type="password" onChange={event => setSenha(event.target.value)}/>
                                </label>
                            )
                        }
                        <button type='submit' id='login' disabled={loading}>{recuperarSenha ? "Enviar E-mail" : "Entrar"} <FiLogIn/></button>
                        {
                            !recuperarSenha ? (
                                <p><a href="#"onClick={() => {setRecuperarSenha(true); setError("");}}>Esqueceu sua senha?</a></p>
                            ) : (
                                <p><a href="#"onClick={() => {setRecuperarSenha(false); setError("");}}>Voltar</a></p>
                            )
                        }
                    </form>
                )
            }
            <Loading loading={loading.toString()}/>
        </MainStyled>
    )
}

export function getServerSideProps(ctx: NextPageContext){
    destroyCookie(ctx, "token", {path: '/'})

    return {
        props: {}
    }
}