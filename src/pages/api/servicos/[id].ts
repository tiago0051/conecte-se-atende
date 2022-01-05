import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { getServiço } from "../../../models/serviço";

export default async function List(req: NextApiRequest, res: NextApiResponse){
    const {id} = req.query;
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {data: number};

        if(decoded){
            const serviço = await getServiço(Number.parseInt(id as string));
    
            return res.status(200).json(serviço)
        }else{
            return res.status(401).json({message: "Usuário não autorizado"})
        }
    }catch {
        return res.status(401).json({message: "Usuário não autorizado"})
    }
}