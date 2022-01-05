import { ServiçosPrestadosStyled } from "../../styles/empresa/dashboard"
import { FiX } from "react-icons/fi"
import { motion } from "framer-motion"

export default function Servicos({clienteCod, setClienteCod}: {clienteCod: number, setClienteCod: () => void}) {
    return(
        <motion.div animate={{opacity: 1}} initial={{opacity: 0}} transition={{ease: "easeInOut", duration: 1}}>
            <ServiçosPrestadosStyled>
                <motion.div animate={{rotateX: 0}} initial={{rotateX: 100}} transition={{ease: "easeInOut", duration: 0.8}}>
                    <FiX onClick={() => setClienteCod()}>Teste</FiX>
                </motion.div>
            </ServiçosPrestadosStyled>
        </motion.div>
    )
}