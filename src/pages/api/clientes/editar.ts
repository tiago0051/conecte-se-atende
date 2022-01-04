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
        endereco: string,
        aniversario: string,
    }
}

export default async function Editar(req: NextApiRequest, res: NextApiResponse){
    const {token, cliente} : IBody = req.body

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { data: number}

    const usuário = await getUsuário(decoded.data)

    if(usuário.id_permissao > 1){
        if(cliente.nome && cliente.email && cliente.whatsapp){
            const {id, nome, cpf, email, whatsapp, telefone, endereco, aniversario} = cliente

            if(id){
                //await UpdateCliente({id, nome, cpf, email, whatsapp, telefone, endereco, aniversario})
            }else{
                await InsertCliente(nome, email, cpf ? cpf : " ", whatsapp, telefone ? whatsapp : " ", usuário.id_empresa, endereco ? endereco : " ", aniversario ? aniversario : "")
            }

            return res.json({success: true})
        }else{
            return res.json({error: 'Os campos obrigatórios não foram preenchidos'})
        }
    }else{
        return res.status(400).json({message: "Você não tem permissão para editar um cliente"})
    }
}