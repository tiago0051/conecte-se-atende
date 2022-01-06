import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getUsuário } from "../../../../models/usuario";
import { ServiçosRecebido } from "../../../../models/cliente";

export default async function ServicosRecebidos(req: NextApiRequest, res: NextApiResponse){
    const {id} = req.query
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {data: number};

        if(decoded){
            const usuário = await getUsuário(decoded.data)
            
            if(usuário.id_permissao > 1){
                const ServiçoRecebidosDB = await ServiçosRecebido(Number.parseInt(id as string))
                res.status(200).json(ServiçoRecebidosDB)
            }else{
                res.status(401).json({message: "Usuário não autorizado"})
            }
        }else{
            return res.status(401).json({message: "Usuário não autorizado"})
        }
    }catch {
        return res.status(401).json({message: "Usuário não autorizado"})
    }
}