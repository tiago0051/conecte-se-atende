import Link from "next/link"
import Image from "next/image"
import { FaUser, FaHandshake, FaCalendarWeek } from "react-icons/fa"

import { NavStyled, NavBarLink } from "../../styles/empresa/dashboard"

interface INavBarProps {
    page: string
}

export default function Navbar(Props: INavBarProps) {
    return (
        <NavStyled>
            <div>
                <Image src="/logo-laranja.svg" alt="Logo Conect-se" layout="fixed" height="150px" width="150px"/>
            </div>

            <ul>
                <NavBarLink selected={Props.page == "clientes"}><FaUser/><Link href="/empresa/dashboard">Clientes</Link></NavBarLink>
                <NavBarLink selected={Props.page == "serviços"}><FaHandshake/><Link href="/empresa/dashboard/servicos">Serviços</Link></NavBarLink>
                <NavBarLink selected={Props.page == "agenda"}><FaCalendarWeek/><Link href="/empresa/dashboard/agenda">Agenda</Link></NavBarLink>
            </ul>
            
            <ul>
                <NavBarLink><Link href="/empresa/dashboard/configuracoes">Configurações</Link></NavBarLink>
                <li><Link href="/empresa/login">Sair</Link></li>
            </ul>
        </NavStyled>
    )
}