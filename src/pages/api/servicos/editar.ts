import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import { InsertServiço, UpdateServiço } from "../../../models/serviço";
import { getUsuário } from "../../../models/usuario";

interface IBody {
    token: string,
    serviço: {
        id?: number,
        nome: string,
        descrição: string,
        valor: number
    }
}

export default async function Editar(req: NextApiRequest, res: NextApiResponse){
    const {token, serviço} : IBody = req.body

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { data: number}

        if(decoded){
            const usuário = await getUsuário(decoded.data)
    
            if(usuário.id_permissao > 1){
                if(serviço.nome && serviço.descrição && serviço.valor){
                    const {id, nome, descrição, valor} = serviço

                    if(id && id > 0){
                        await UpdateServiço(id, nome, descrição, valor)
                    }else{
                        await InsertServiço(nome, descrição, valor, usuário.id_empresa)
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