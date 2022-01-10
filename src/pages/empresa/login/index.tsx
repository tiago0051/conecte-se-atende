import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react';
import { useRouter } from 'next/router'
import { NextPageContext } from 'next';
import { destroyCookie } from 'nookies';
import {FiLogIn} from 'react-icons/fi'

import {MainStyled} from '../../../styles/empresa/login';
import { AuthContext } from '../../../contexts/AuthContext';

export default function Login(){
    const {signIn, enviarEmailRecuperação} = useContext(AuthContext)
    const router = useRouter();

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
                const info = await enviarEmailRecuperação(email)
                setError('E-mail enviado com sucesso')
            }
        }else{
            signIn(email, senha).then(response => {
                if(response){
                    router.push('/empresa/dashboard')
                }else{
                    setError('Usuário ou senha inválidos')
                }
            })
        }
    }

    return (
        <MainStyled>
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
                <button type='submit' id='login'>{recuperarSenha ? "Enviar E-mail" : "Entrar"} <FiLogIn/></button>
                {
                    !recuperarSenha ? (
                        <p><a href="#"onClick={() => setRecuperarSenha(true)}>Esqueceu sua senha?</a></p>
                    ) : (
                        <p><a href="#"onClick={() => setRecuperarSenha(false)}>Voltar</a></p>
                    )
                }
            </form>
        </MainStyled>
    )
}

export function getServerSideProps(ctx: NextPageContext){
    destroyCookie(ctx, "token", {path: '/'})

    return {
        props: {}
    }
}