import { createContext, useState, useEffect, FC } from "react";
import axios from 'axios';
import nookies, { destroyCookie, parseCookies} from 'nookies'
import { useRouter } from 'next/router'

interface IAxiosResponse {
    data: {
        token: string,
        usuário: IUser,
        logado: boolean
    },
    status: number
}

interface IUser {
    id: number,
    user: String,
    nome: String,
    email: String,
    id_empresa: number,
    id_permissao: number
}

interface IAuthContext {
    user: IUser | null,
    isAuthenticated: boolean,
    signIn(usuário: String, senha: String): Promise<IUser | null>,
    enviarEmailRecuperação(email: String): Promise<boolean>,
    trocarSenha(token: string, senha: String): Promise<boolean>,
    updateUser(): void,
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider:FC = ({ children }) => {
    const router = useRouter()

    const [user, setUser] = useState<IUser | null>(null)
    const isAuthenticated = !!user;

    useEffect(() => {
        updateUser
    }, [])

    function updateUser(){
        const {token} = parseCookies()
        
        if(token){
            const empresa = router.query.id_empresa as string
            const id_empresa = parseInt(empresa)
            axios.post('/api/auth/check', {token, id_empresa}).then(response => {
                if(response.data.logado){
                    setUser(response.data.usuário)
                }else{
                    destroyCookie(null, 'token')
                    setUser(null)
                    router.push('/empresa/login')
                }
            })
        }else{
            setUser(null)
        }
    }

    async function signIn (usuário: String, senha: String): Promise<IUser | null> {
        return new Promise((resolve, reject) => {
            axios.post('/api/auth/login', {usuário: usuário, senha: senha}).then((response: IAxiosResponse) => {
                if(response.data.logado){
                    nookies.set({}, 'token', response.data.token, {maxAge: 60 * 60, path: '/'});
                    setUser(response.data.usuário);
                    resolve(response.data.usuário);
                }else{
                    setUser(null)
                    resolve(null)
                }
            })
        })
    }

    async function enviarEmailRecuperação(email: String): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            axios.post('/api/auth/verificar_email', {email: email}).then(response => {
                if(response.status == 200){
                    resolve(response.data.enviado)
                }else{
                    reject(response.data.enviado)
                }
            })
        })
    }

    async function trocarSenha(token: String, senha: String){
        return new Promise<boolean>((resolve, reject) => {
            console.log("a")
            axios.post('/api/auth/cadastrar', {token: token, senha: senha}).then(response => {
                if(response.status == 200){
                    resolve(true)
                }else{
                    reject(false)
                }
            })
        })
    }

  return (
        <AuthContext.Provider value={{isAuthenticated, signIn, user, enviarEmailRecuperação, trocarSenha, updateUser}}>
            {children}
        </AuthContext.Provider> 
  );
}