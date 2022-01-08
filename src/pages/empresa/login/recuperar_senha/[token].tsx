import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react';
import { useRouter } from 'next/router'
import { NextPageContext } from 'next';
import { destroyCookie } from 'nookies';
import {FiLogIn} from 'react-icons/fi'

import {MainStyled} from '../../../../styles/empresa/login';
import { AuthContext } from '../../../../contexts/AuthContext';

export default function RecuperarSenha({token} : {token: string}) {
    const {trocarSenha} = useContext(AuthContext)
    const router = useRouter();

    const [senha, setSenha] = useState('');
    const [senhaConfirmação, setSenhaConfirmação] = useState('');
    const [error, setError] = useState('');

    function handleSubmitLogar(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        if(senha == senhaConfirmação){
            trocarSenha(token, senha).then(response => {
                if(response){
                    router.push('/empresa/login')
                }else{
                    setError('Erro ao trocar senha')
                }
            })
        }else{
            setError('As senhas não conferem')
        }
    }

    return(
        <MainStyled>
            <form onSubmit={handleSubmitLogar}>
                <Image src='/logo-laranja.svg' alt='Logo' width='150' height='150' />

                <h1>Login <br/><b style={{fontSize: "1rem"}}>{error}</b></h1>

                <label>
                    Senha:
                    <input type="password" onChange={event => setSenha(event.target.value)}/>
                </label>
                <label>
                    Confirme a senha:
                    <input type="password" onChange={event => setSenhaConfirmação(event.target.value)}/>
                </label>
                <button type='submit'>Entrar <FiLogIn/></button>
            </form>
        </MainStyled>
    )
}

export function getServerSideProps(ctx: NextPageContext){
    const {token} = ctx.query

    return {
        props: {
            token
        }
    }
}