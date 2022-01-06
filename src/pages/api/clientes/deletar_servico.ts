import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getUsuário } from "../../../models/usuario";
import { deletServiçoRecebido } from "../../../models/cliente";

interface IBody {
    token: string,
    id: number
}

export default async function DeletarServico(req:NextApiRequest, res: NextApiResponse){
    const {token, id} = req.body as IBody;

    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {data: number};

        const usuário = await getUsuário(decoded.data)

        if(usuário.id_permissao > 1){
            const cliente = await deletServiçoRecebido(id)
            if(cliente){
                res.status(200).json({
                    status: "success",
                    message: "Serviço deletado com sucesso!"
                })
            }else{
                res.status(500).json({
                    status: "error",
                    message: "Não foi possivel deletar o serviço!"
                })
            }
        }else{
            return res.status(401).json({message: "Usuário não autorizado"})
        }
    }catch{
        res.status(401).json({
            status: 'error',
            message: 'Usuário não autorizado'
        })
    }
}