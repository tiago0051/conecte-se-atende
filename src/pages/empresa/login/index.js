import Image from 'next/image'
import Link from 'next/link'

import {MainStyled} from '../../../styles/empresa/login';
import {FiLogIn} from 'react-icons/fi'
import {FaFacebookSquare, FaGoogle} from 'react-icons/fa'

export default function Login(){
    return (
        <MainStyled>
            <form>
                <Image src='/logo-laranja.svg' alt='Logo' width='150' height='150' />

                <h1>Login</h1>

                <label>
                    E-mail:
                    <input type="email" />
                </label>
                <label>
                    Senha:
                    <input type="password" />
                </label>
                <button>Entrar <FiLogIn/></button>
                <p><Link href="/empresa/recuperar-senha">Esqueceu sua senha?</Link></p>
            </form>
        </MainStyled>
    )
}