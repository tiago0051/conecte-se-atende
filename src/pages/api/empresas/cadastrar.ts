import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import {getEmpresaByEmail, InsertEmpresa} from "../../../models/empresa";
import { getUsuárioByEmail, InsertUsuário } from "../../../models/usuario";

export default async function Cadastrar(req: NextApiRequest, res: NextApiResponse){
    const {nomeEmpresa, emailEmpresa, emailUsuário, nomeUsuário} = req.body

    if(!nomeEmpresa || !emailEmpresa || !emailUsuário || !nomeUsuário){
        return res.status(400).json({
            error: 'Dados insuficientes'
        })
    }

    var empresa = await getEmpresaByEmail(emailEmpresa)

    var usuário = await getUsuárioByEmail(emailUsuário)

    if(!empresa && !usuário){
        InsertEmpresa(nomeEmpresa, '', '', emailEmpresa, '').then(async () => {
            empresa = await getEmpresaByEmail(emailEmpresa)

            await InsertUsuário(emailUsuário, nomeUsuário, emailUsuário, empresa!.id, 3)
    
            axios.post(`https://${process.env.VERCEL_URL}/api/auth/verificar_email`, {email: emailUsuário}).then((response) => {
                if(response.status == 200){
                    return res.status(200).json({success: true, mensagem: 'Empresa cadastrada com sucesso'})
                }else{
                    return res.status(500).json({success: true, mensagem: 'Erro ao cadastrar empresa'})
                }
            })
        }).catch(error => {
            return res.status(400).json({success: false, mensagem: "Erro ao inserir empresa: " + error.message, error})
        })

    }else{
        res.json({success: false, mensagem: "Empresa ou usuário já cadastrada"})
    }
}