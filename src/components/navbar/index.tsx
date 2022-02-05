import Link from "next/link"
import Image from "next/image"
import { FaUser, FaHandshake, FaCalendarWeek, FaBoxes } from "react-icons/fa"

import { NavStyled, NavBarLink } from "./navbar"
import { FiArrowRight } from "react-icons/fi"

interface INavBarProps {
    page: string,
    id_empresa: number
}

export default function Navbar(Props: INavBarProps) {
    return (
        <NavStyled>
            <div>
                <Image src="/logo-laranja.svg" alt="Logo Conect-se" layout="fixed" height="150px" width="150px"/>
            </div>

            <FiArrowRight/>

            <ul>
                <Link href={"/empresa/"+ Props.id_empresa +"/dashboard"} passHref><NavBarLink selected={Props.page == "clientes"}><FaUser/>Clientes</NavBarLink></Link>
                <Link href={"/empresa/"+ Props.id_empresa +"/dashboard/estoque"} passHref><NavBarLink selected={Props.page == "estoque"}><FaBoxes/>Estoque</NavBarLink></Link>
                <Link href={"/empresa/"+ Props.id_empresa +"/dashboard/servicos"} passHref><NavBarLink selected={Props.page == "serviços"}><FaHandshake/>Serviços</NavBarLink></Link>
                <Link href={"/empresa/"+ Props.id_empresa +"/dashboard/agenda"} passHref><NavBarLink selected={Props.page == "agenda"}><FaCalendarWeek/>Agenda</NavBarLink></Link>
            </ul>
            
            <ul>
                <NavBarLink selected={Props.page == "configurações"}><Link href={"/empresa/"+ Props.id_empresa +"/dashboard/configuracoes"}>Configurações</Link></NavBarLink>
                <li><Link href="/empresa/login">Sair</Link></li>
            </ul>
        </NavStyled>
    )
}