import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import { InsertCliente, UpdateCliente } from "../../../models/cliente";
import { getUsuário } from "../../../models/usuario";

interface IBody {
    token: string,
    cliente: {
        id?: number,
        nome: string,
        cpf: string,
        email: string,
        whatsapp: string,
        telefone: string,
        endereço: string,
        aniversario: string,
        obs: string
    }
}

export default async function Editar(req: NextApiRequest, res: NextApiResponse){
    const {token, cliente} : IBody = req.body

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { data: number}

        if(decoded){
            const usuário = await getUsuário(decoded.data)
    
            if(usuário.id_permissao > 1){
                if(cliente.nome && cliente.email && cliente.whatsapp){
                    const {id, nome, cpf, email, whatsapp, telefone, endereço, aniversario, obs} = cliente

                    if(id && id > 0){
                        await UpdateCliente(id, nome, cpf, email, whatsapp, telefone, endereço, aniversario, obs)
                    }else{
                        await InsertCliente(nome, email, cpf ? cpf : " ", whatsapp, telefone ? whatsapp : " ", usuário.id_empresa, endereço ? endereço : " ", aniversario ? aniversario : " ", obs ? obs : " ")
                    }
        
                    return res.json({success: true})
                }else{
                    return res.json({error: 'Os campos obrigatórios não foram preenchidos'})
                }
            }else{
                return res.status(400).json({message: "Você não tem permissão para editar um cliente"})
            }
        }else{
            return res.status(401).json({message: "Usuário não autorizado"})
        }
    }catch{
        return res.status(401).json({message: "Usuário não autorizado"})
    }
}