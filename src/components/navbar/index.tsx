import Link from "next/link"
import Image from "next/image"
import { FaUser, FaHandshake, FaCalendarWeek, FaBoxes, FaUserTie, FaFileInvoice, FaStore } from "react-icons/fa"

import { NavStyled, NavBarLink } from "./navbar"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

interface INavBarProps {
    page: string,
    id_empresa: number
}

export default function Navbar(Props: INavBarProps) {
    const {user} = useContext(AuthContext)
    
    return (
        <NavStyled>
            <div>
                <Image src="/logo-laranja.svg" alt="Logo Conect-se" layout="fixed" height="150px" width="150px"/>
            </div>

            <ul>
                <Link href={"/empresa/"+ Props.id_empresa +"/dashboard/balcao"} passHref><NavBarLink selected={Props.page == "balcao"}><FaStore/>Balcão</NavBarLink></Link>
                <Link href={"/empresa/"+ Props.id_empresa +"/dashboard/clientes"} passHref><NavBarLink selected={Props.page == "clientes"}><FaUser/>Clientes</NavBarLink></Link>
                <Link href={"/empresa/"+ Props.id_empresa +"/dashboard/produtos"} passHref><NavBarLink selected={Props.page == "produtos"}><FaBoxes/>Produtos</NavBarLink></Link>
                <Link href={"/empresa/"+ Props.id_empresa +"/dashboard/agenda"} passHref><NavBarLink selected={Props.page == "agenda"}><FaCalendarWeek/>Agenda</NavBarLink></Link>
                {
                    user?.id_permissao && user.id_permissao > 2 && (
                        <>
                            <Link href={"/empresa/"+ Props.id_empresa +"/dashboard/funcionarios"} passHref><NavBarLink selected={Props.page == "funcionarios"}><FaUserTie/>Funcionários</NavBarLink></Link>
                            <Link href={"/empresa/"+ Props.id_empresa +"/dashboard/relatorios"} passHref><NavBarLink selected={Props.page == "relatorios"}><FaFileInvoice/>Relatórios</NavBarLink></Link>
                        </>
                    )
                }
            </ul>
            
            <ul>
                <NavBarLink selected={Props.page == "configurações"} style={{justifyContent: "center"}}><Link href={"/empresa/"+ Props.id_empresa +"/dashboard/configuracoes"}>Configurações</Link></NavBarLink>
                <li><Link href="/empresa/login">Sair</Link></li>
            </ul>
        </NavStyled>
    )
}