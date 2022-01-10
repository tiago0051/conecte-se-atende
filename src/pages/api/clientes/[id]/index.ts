import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { getCliente } from "../../../../models/cliente";
import { getUsuário } from "../../../../models/usuario";

export default async function List(req: NextApiRequest, res: NextApiResponse){
    const {id} = req.query;
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {data: number};

        if(decoded && id){
            const cliente = await getCliente(Number.parseInt(id as string))
            if(cliente.id_usuário == decoded.data){
                const usuário = await getUsuário(decoded.data)
                return res.status(200).json({nome: usuário.nome, cpf: cliente.cpf, email: usuário.email, whatsapp: cliente.whatsapp, telefone: cliente.telefone, endereço: cliente.endereço, aniversario: cliente.aniversario, obs: cliente.obs})
            }else{
                const usuárioLogado = await getUsuário(decoded.data)

                if(usuárioLogado.id_permissao > 1){
                    const usuário = await getUsuário(cliente.id_usuário)
                    return res.status(200).json({nome: usuário.nome, cpf: cliente.cpf, email: usuário.email, whatsapp: cliente.whatsapp, telefone: cliente.telefone, endereço: cliente.endereço, aniversario: cliente.aniversario, obs: cliente.obs})
                }else{
                    return res.status(401).json({message: "Usuário não autorizado"})
                }
            }
        }else{
            return res.status(401).json({message: "Usuário não autorizado"})
        }
    }catch {
        return res.status(401).json({message: "Usuário não autorizado"})
    }
}