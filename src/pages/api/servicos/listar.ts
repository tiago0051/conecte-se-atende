import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getUsuário } from "../../../models/usuario";
import { getServiços } from "../../../models/serviço";

export default async function Listar(req: NextApiRequest, res: NextApiResponse){
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {data: number};

        if(decoded){
            const usuário = await getUsuário(decoded.data)
    
            return res.status(200).json(await getServiços(usuário.id_empresa))
        }else{
            return res.status(401).json({message: "Usuário não autorizado"})
        }
    }catch {
        return res.status(401).json({message: "Usuário não autorizado"})
    }
}