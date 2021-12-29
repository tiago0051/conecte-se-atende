import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react';
import { useRouter } from 'next/router'

import {MainStyled} from '../../../styles/empresa/login';
import {FiLogIn} from 'react-icons/fi'
import { AuthContext } from '../../../contexts/AuthContext';

export default function Login(){
    const {signIn} = useContext(AuthContext)
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    function handleSubmitLogar(event){
        event.preventDefault();

        signIn(email, senha).then(response => {
            if(response){
                router.push('/empresa/dashboard')
            }else{
                setError('Usuário ou senha inválidos')
            }
        })
    }

    return (
        <MainStyled>
            <form onSubmit={handleSubmitLogar}>
                <Image src='/logo-laranja.svg' alt='Logo' width='150' height='150' />

                <h1>Login{error}</h1>

                <label>
                    E-mail:
                    <input type="email" onChange={event => setEmail(event.target.value)}/>
                </label>
                <label>
                    Senha:
                    <input type="password" onChange={event => setSenha(event.target.value)}/>
                </label>
                <button type='submit'>Entrar <FiLogIn/></button>
                <p><Link href="/empresa/recuperar-senha">Esqueceu sua senha?</Link></p>
            </form>
        </MainStyled>
    )
}