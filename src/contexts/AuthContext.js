import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import nookies, { destroyCookie, parseCookies} from 'nookies'
import { useRouter } from 'next/router'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const router = useRouter()

    const [user, setUser] = useState(null)
    const isAuthenticated = !!user;

    useEffect(() => {
        const {token} = parseCookies(null)
        axios.post('/api/auth/check', {token}).then(response => {
            console.log(response.data.logado)
            if(response.data.logado){
                setUser(response.data.empresa)
            }else{
                destroyCookie(null, 'token')
                setUser(null)
                router.push('/empresa/login')
            }
        })
    }, [])

    async function signIn(usuário, senha){
        return new Promise((resolve, reject) => {
            axios.post('/api/empresa/login', {usuário: usuário, senha: senha}).then(response => {
                if(response.status == 200){
                    nookies.set({}, 'token', response.data.token, {maxAge: 60 * 60, path: '/'});
                    setUser(response.data.empresa);
                    resolve(response.data.empresa);
                }else{
                    setUser(null)
                    resolve(null)
                }
            })
        })
    }

  return (
        <AuthContext.Provider value={{isAuthenticated, signIn, user}}>
            {children}
        </AuthContext.Provider> 
  );
}